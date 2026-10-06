
import React, { useMemo, useState } from "react";
import styled from "styled-components";

import NavSection from "../NavSection";
/* =====================================================
   MOCK USER DATA
   This can later be replaced with:
   GET /api/users
===================================================== */

const initialUsers = [
  {
    id: 1,
    employeeId: "EMP001",
    name: "Rahul Kumar",
    email: "rahul@hirnest.com",
    role: "Employee",
    domain: "Frontend",
    status: "Active",
    joinedDate: "2026-06-01",
    lastLogin: "2026-10-05",
  },

  {
    id: 2,
    employeeId: "EMP002",
    name: "Priya Sharma",
    email: "priya@hirnest.com",
    role: "HR Manager",
    domain: "HR",
    status: "Active",
    joinedDate: "2026-01-15",
    lastLogin: "2026-10-06",
  },

  {
    id: 3,
    employeeId: "EMP003",
    name: "Kiran Reddy",
    email: "kiran@hirnest.com",
    role: "Employee",
    domain: "QA",
    status: "Active",
    joinedDate: "2026-07-10",
    lastLogin: "2026-10-04",
  },

  {
    id: 4,
    employeeId: "EMP004",
    name: "Anjali Rao",
    email: "anjali@hirnest.com",
    role: "Admin",
    domain: "Management",
    status: "Active",
    joinedDate: "2026-02-20",
    lastLogin: "2026-10-06",
  },

  {
    id: 5,
    employeeId: "EMP005",
    name: "Vikram Singh",
    email: "vikram@hirnest.com",
    role: "Employee",
    domain: "Frontend",
    status: "Inactive",
    joinedDate: "2026-08-01",
    lastLogin: "2026-09-15",
  },

  {
    id: 6,
    employeeId: "EMP006",
    name: "Sneha Reddy",
    email: "sneha@hirnest.com",
    role: "Employee",
    domain: "Backend",
    status: "Active",
    joinedDate: "2026-03-10",
    lastLogin: "2026-10-05",
  },
];


/* =====================================================
   USER MANAGEMENT
===================================================== */

const UserManagement = () => {

  const [users, setUsers] =
    useState(initialUsers);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [roleFilter, setRoleFilter] =
    useState("all");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [showModal, setShowModal] =
    useState(false);

  const [editingUser, setEditingUser] =
    useState(null);


  const [formData, setFormData] =
    useState({
      name: "",
      employeeId: "",
      email: "",
      role: "Employee",
      domain: "Frontend",
      status: "Active",
    });


  /* ===================================================
     FILTER USERS
  =================================================== */

  const filteredUsers = useMemo(() => {

    return users.filter((user) => {

      const search =
        searchTerm.toLowerCase();

      const matchesSearch =
        user.name
          .toLowerCase()
          .includes(search) ||

        user.email
          .toLowerCase()
          .includes(search) ||

        user.employeeId
          .toLowerCase()
          .includes(search);


      const matchesRole =
        roleFilter === "all" ||
        user.role === roleFilter;


      const matchesStatus =
        statusFilter === "all" ||
        user.status === statusFilter;


      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus
      );
    });

  }, [
    users,
    searchTerm,
    roleFilter,
    statusFilter,
  ]);


  /* ===================================================
     SUMMARY
  =================================================== */

  const totalUsers = users.length;

  const activeUsers =
    users.filter(
      (user) =>
        user.status === "Active"
    ).length;

  const inactiveUsers =
    users.filter(
      (user) =>
        user.status === "Inactive"
    ).length;

  const adminUsers =
    users.filter(
      (user) =>
        user.role === "Admin"
    ).length;


  /* ===================================================
     OPEN ADD USER
  =================================================== */

  const handleAddUser = () => {

    setEditingUser(null);

    setFormData({
      name: "",
      employeeId: "",
      email: "",
      role: "Employee",
      domain: "Frontend",
      status: "Active",
    });

    setShowModal(true);
  };


  /* ===================================================
     OPEN EDIT USER
  =================================================== */

  const handleEditUser = (user) => {

    setEditingUser(user);

    setFormData({
      name: user.name,
      employeeId: user.employeeId,
      email: user.email,
      role: user.role,
      domain: user.domain,
      status: user.status,
    });

    setShowModal(true);
  };


  /* ===================================================
     FORM CHANGE
  =================================================== */

  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  /* ===================================================
     SAVE USER
  =================================================== */

  const handleSubmit = (event) => {

    event.preventDefault();


    if (editingUser) {

      setUsers((previousUsers) =>
        previousUsers.map((user) =>
          user.id === editingUser.id
            ? {
                ...user,
                ...formData,
              }
            : user
        )
      );

    } else {

      const newUser = {
        id: Date.now(),

        ...formData,

        joinedDate:
          new Date()
            .toISOString()
            .split("T")[0],

        lastLogin: "Never",
      };


      setUsers((previousUsers) => [
        ...previousUsers,
        newUser,
      ]);
    }


    setShowModal(false);
  };


  /* ===================================================
     DELETE USER
  =================================================== */

  const handleDelete = (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this user?"
      );


    if (!confirmed) {
      return;
    }


    setUsers((previousUsers) =>
      previousUsers.filter(
        (user) => user.id !== id
      )
    );
  };


  /* ===================================================
     TOGGLE USER STATUS
  =================================================== */

  const handleToggleStatus = (id) => {

    setUsers((previousUsers) =>
      previousUsers.map((user) =>
        user.id === id
          ? {
              ...user,
              status:
                user.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : user
      )
    );
  };


  /* ===================================================
     RESET FILTERS
  =================================================== */

  const resetFilters = () => {

    setSearchTerm("");

    setRoleFilter("all");

    setStatusFilter("all");
  };


  /* ===================================================
     EXPORT USERS
  =================================================== */

  const handleExport = () => {

    const headers = [
      "Employee ID",
      "Name",
      "Email",
      "Role",
      "Domain",
      "Status",
      "Joined Date",
      "Last Login",
    ];


    const rows =
      filteredUsers.map((user) => [

        user.employeeId,
        user.name,
        user.email,
        user.role,
        user.domain,
        user.status,
        user.joinedDate,
        user.lastLogin,

      ]);


    const csvData = [
      headers.join(","),
      ...rows.map((row) =>
        row.join(",")
      ),
    ].join("\n");


    const blob = new Blob(
      [csvData],
      {
        type: "text/csv;charset=utf-8;",
      }
    );


    const url =
      URL.createObjectURL(blob);


    const link =
      document.createElement("a");


    link.href = url;

    link.download =
      "hirnest-users.csv";

    link.click();


    URL.revokeObjectURL(url);
  };


  return (

    <Page>
        <NavSection/>

      {/* =================================================
          HEADER
      ================================================= */}

      <Header>

        <HeaderContent>

          <Title>
            User Management
          </Title>

          <Description>
            Manage HirNest users, roles,
            access and account status.
          </Description>

        </HeaderContent>


        <HeaderActions>

          <ExportButton
            onClick={handleExport}
          >
            ↓ Export
          </ExportButton>


          <AddButton
            onClick={handleAddUser}
          >
            + Add User
          </AddButton>

        </HeaderActions>

      </Header>


      {/* =================================================
          SUMMARY
      ================================================= */}

      <SummaryGrid>

        <SummaryCard>

          <SummaryIcon>
            👥
          </SummaryIcon>

          <SummaryContent>

            <SummaryLabel>
              Total Users
            </SummaryLabel>

            <SummaryValue>
              {totalUsers}
            </SummaryValue>

          </SummaryContent>

        </SummaryCard>


        <SummaryCard>

          <SummaryIcon>
            ✓
          </SummaryIcon>

          <SummaryContent>

            <SummaryLabel>
              Active Users
            </SummaryLabel>

            <SummaryValue>
              {activeUsers}
            </SummaryValue>

          </SummaryContent>

        </SummaryCard>


        <SummaryCard>

          <SummaryIcon>
            ⏸
          </SummaryIcon>

          <SummaryContent>

            <SummaryLabel>
              Inactive Users
            </SummaryLabel>

            <SummaryValue>
              {inactiveUsers}
            </SummaryValue>

          </SummaryContent>

        </SummaryCard>


        <SummaryCard>

          <SummaryIcon>
            🛡
          </SummaryIcon>

          <SummaryContent>

            <SummaryLabel>
              Administrators
            </SummaryLabel>

            <SummaryValue>
              {adminUsers}
            </SummaryValue>

          </SummaryContent>

        </SummaryCard>

      </SummaryGrid>


      {/* =================================================
          FILTERS
      ================================================= */}

      <FilterCard>

        <FilterTitle>
          Search & Filters
        </FilterTitle>


        <FilterGrid>

          <FilterItem>

            <Label>
              Search
            </Label>

            <Input
              type="text"
              placeholder="Search by name, ID or email..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(
                  event.target.value
                )
              }
            />

          </FilterItem>


          <FilterItem>

            <Label>
              Role
            </Label>

            <Select
              value={roleFilter}
              onChange={(event) =>
                setRoleFilter(
                  event.target.value
                )
              }
            >

              <option value="all">
                All Roles
              </option>

              <option value="Admin">
                Admin
              </option>

              <option value="HR Manager">
                HR Manager
              </option>

              <option value="Employee">
                Employee
              </option>

            </Select>

          </FilterItem>


          <FilterItem>

            <Label>
              Status
            </Label>

            <Select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value
                )
              }
            >

              <option value="all">
                All Status
              </option>

              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>

            </Select>

          </FilterItem>


          <ResetButton
            onClick={resetFilters}
          >
            Reset
          </ResetButton>

        </FilterGrid>

      </FilterCard>


      {/* =================================================
          USER TABLE
      ================================================= */}

      <TableCard>

        <TableHeader>

          <TableTitle>
            Users
          </TableTitle>

          <UserCount>
            {filteredUsers.length} Users
          </UserCount>

        </TableHeader>


        <TableContainer>

          <Table>

            <thead>

              <tr>

                <Th>
                  User
                </Th>

                <Th>
                  Employee ID
                </Th>

                <Th>
                  Role
                </Th>

                <Th>
                  Domain
                </Th>

                <Th>
                  Status
                </Th>

                <Th>
                  Joined Date
                </Th>

                <Th>
                  Last Login
                </Th>

                <Th>
                  Actions
                </Th>

              </tr>

            </thead>


            <tbody>

              {filteredUsers.length === 0 ? (

                <tr>

                  <Td colSpan="8">

                    <EmptyState>
                      No users found.
                    </EmptyState>

                  </Td>

                </tr>

              ) : (

                filteredUsers.map(
                  (user) => (

                    <tr key={user.id}>

                      <Td>

                        <UserInfo>

                          <Avatar>
                            {user.name
                              .charAt(0)
                              .toUpperCase()}
                          </Avatar>


                          <UserDetails>

                            <UserName>
                              {user.name}
                            </UserName>

                            <UserEmail>
                              {user.email}
                            </UserEmail>

                          </UserDetails>

                        </UserInfo>

                      </Td>


                      <Td>
                        {user.employeeId}
                      </Td>


                      <Td>

                        <RoleBadge
                          role={user.role}
                        >
                          {user.role}
                        </RoleBadge>

                      </Td>


                      <Td>
                        {user.domain}
                      </Td>


                      <Td>

                        <StatusBadge
                          status={user.status}
                        >
                          {user.status}
                        </StatusBadge>

                      </Td>


                      <Td>
                        {user.joinedDate}
                      </Td>


                      <Td>
                        {user.lastLogin}
                      </Td>


                      <Td>

                        <Actions>

                          <ActionButton
                            onClick={() =>
                              handleEditUser(user)
                            }
                          >
                            Edit
                          </ActionButton>


                          <ActionButton
                            onClick={() =>
                              handleToggleStatus(
                                user.id
                              )
                            }
                          >
                            {user.status ===
                            "Active"
                              ? "Disable"
                              : "Enable"}
                          </ActionButton>


                          <DeleteButton
                            onClick={() =>
                              handleDelete(
                                user.id
                              )
                            }
                          >
                            Delete
                          </DeleteButton>

                        </Actions>

                      </Td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </Table>

        </TableContainer>

      </TableCard>


      {/* =================================================
          ADD / EDIT USER MODAL
      ================================================= */}

      {showModal && (

        <ModalOverlay>

          <Modal>

            <ModalHeader>

              <ModalTitle>

                {editingUser
                  ? "Edit User"
                  : "Add New User"}

              </ModalTitle>


              <CloseButton
                type="button"
                onClick={() =>
                  setShowModal(false)
                }
              >
                ×
              </CloseButton>

            </ModalHeader>


            <Form
              onSubmit={handleSubmit}
            >

              <FormGroup>

                <Label>
                  Full Name
                </Label>

                <Input
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </FormGroup>


              <FormGroup>

                <Label>
                  Employee ID
                </Label>

                <Input
                  type="text"
                  name="employeeId"
                  placeholder="EMP007"
                  value={formData.employeeId}
                  onChange={handleChange}
                  required
                />

              </FormGroup>


              <FormGroup>

                <Label>
                  Email
                </Label>

                <Input
                  type="email"
                  name="email"
                  placeholder="employee@hirnest.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </FormGroup>


              <FormRow>

                <FormGroup>

                  <Label>
                    Role
                  </Label>

                  <Select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >

                    <option value="Employee">
                      Employee
                    </option>

                    <option value="HR Manager">
                      HR Manager
                    </option>

                    <option value="Admin">
                      Admin
                    </option>

                  </Select>

                </FormGroup>


                <FormGroup>

                  <Label>
                    Domain
                  </Label>

                  <Select
                    name="domain"
                    value={formData.domain}
                    onChange={handleChange}
                  >

                    <option value="Frontend">
                      Frontend
                    </option>

                    <option value="Backend">
                      Backend
                    </option>

                    <option value="QA">
                      QA
                    </option>

                    <option value="UI/UX">
                      UI/UX
                    </option>

                    <option value="HR">
                      HR
                    </option>

                    <option value="Management">
                      Management
                    </option>

                  </Select>

                </FormGroup>

              </FormRow>


              <FormGroup>

                <Label>
                  Account Status
                </Label>

                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >

                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>

                </Select>

              </FormGroup>


              <ModalActions>

                <CancelButton
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </CancelButton>


                <SaveButton
                  type="submit"
                >
                  {editingUser
                    ? "Update User"
                    : "Create User"}
                </SaveButton>

              </ModalActions>

            </Form>

          </Modal>

        </ModalOverlay>

      )}

    </Page>
  );
};


/* =====================================================
   STYLED COMPONENTS
===================================================== */

const Page = styled.div`
  min-height: 100vh;
  padding: 24px;
  background: #f8fafc;
  margin-left:250px;
  background-size:cover;
  overflow-y:auto;
   
`;


/* =====================================================
   HEADER
===================================================== */

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
   overflow: auto; 

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;


const HeaderContent = styled.div``;


const Title = styled.h1`
  margin: 0;
  color: #0f172a;
  font-size: 28px;
  font-weight: 700;
`;


const Description = styled.p`
  margin: 6px 0 0;
  color: #64748b;
  font-size: 14px;
`;


const HeaderActions = styled.div`
  display: flex;
  gap: 10px;
`;


const ExportButton = styled.button`
  padding: 10px 16px;

  border: 1px solid #cbd5e1;

  border-radius: 8px;

  background: white;

  color: #334155;

  font-size: 13px;

  font-weight: 600;

  cursor: pointer;

  &:hover {
    background: #f8fafc;
  }
`;


const AddButton = styled.button`
  padding: 10px 16px;

  border: none;

  border-radius: 8px;

  background: #2563eb;

  color: white;

  font-size: 13px;

  font-weight: 600;

  cursor: pointer;

  &:hover {
    background: #1d4ed8;
  }
`;


/* =====================================================
   SUMMARY
===================================================== */

const SummaryGrid = styled.div`
  display: grid;

  grid-template-columns:
    repeat(4, 1fr);

  gap: 16px;

  margin-bottom: 24px;

  @media (max-width: 900px) {
    grid-template-columns:
      repeat(2, 1fr);
  }

  @media (max-width: 500px) {
    grid-template-columns:
      1fr;
  }
`;


const SummaryCard = styled.div`
  display: flex;

  align-items: center;

  gap: 14px;

  padding: 18px;

  background: white;

  border: 1px solid #e2e8f0;

  border-radius: 12px;
`;


const SummaryIcon = styled.div`
  width: 42px;
  height: 42px;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 10px;

  background: #eff6ff;

  font-size: 19px;
`;


const SummaryContent = styled.div``;


const SummaryLabel = styled.div`
  color: #64748b;

  font-size: 12px;

  margin-bottom: 5px;
`;


const SummaryValue = styled.div`
  color: #0f172a;

  font-size: 22px;

  font-weight: 700;
`;


/* =====================================================
   FILTERS
===================================================== */

const FilterCard = styled.div`
  padding: 20px;

  margin-bottom: 24px;

  background: white;

  border: 1px solid #e2e8f0;

  border-radius: 12px;
`;


const FilterTitle = styled.h2`
  margin: 0 0 16px;

  color: #0f172a;

  font-size: 17px;
`;


const FilterGrid = styled.div`
  display: grid;

  grid-template-columns:
    2fr 1fr 1fr auto;

  align-items: end;

  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns:
      1fr 1fr;
  }

  @media (max-width: 600px) {
    grid-template-columns:
      1fr;
  }
`;


const FilterItem = styled.div`
  display: flex;

  flex-direction: column;

  gap: 7px;
`;


const Label = styled.label`
  color: #334155;

  font-size: 13px;

  font-weight: 600;
`;


const Input = styled.input`
  width: 100%;

  box-sizing: border-box;

  padding: 10px 12px;

  border: 1px solid #cbd5e1;

  border-radius: 7px;

  outline: none;

  font-size: 13px;

  &:focus {
    border-color: #2563eb;

    box-shadow:
      0 0 0 2px
      rgba(37, 99, 235, 0.1);
  }
`;


const Select = styled.select`
  width: 100%;

  box-sizing: border-box;

  padding: 10px 12px;

  border: 1px solid #cbd5e1;

  border-radius: 7px;

  background: white;

  outline: none;

  font-size: 13px;

  &:focus {
    border-color: #2563eb;
  }
`;


const ResetButton = styled.button`
  padding: 10px 16px;

  border: 1px solid #cbd5e1;

  border-radius: 7px;

  background: white;

  color: #475569;

  font-size: 13px;

  font-weight: 600;

  cursor: pointer;

  &:hover {
    background: #f8fafc;
  }
`;


/* =====================================================
   TABLE
===================================================== */

const TableCard = styled.div`
  margin-bottom: 24px;

  background: white;

  border: 1px solid #e2e8f0;

  border-radius: 12px;

   overflow-y:scroll;
   background-size:cover;
`;


const TableHeader = styled.div`
  display: flex;

  justify-content: space-between;

  align-items: center;

  padding: 18px 20px;

  border-bottom: 1px solid #e2e8f0;
`;


const TableTitle = styled.h2`
  margin: 0;

  color: #0f172a;

  font-size: 17px;
`;


const UserCount = styled.span`
  color: #64748b;

  font-size: 13px;
`;


const TableContainer = styled.div`
  width: 100%;

  overflow-x: auto;
`;


const Table = styled.table`
  width: 100%;

  min-width: 1050px;

  border-collapse: collapse;

`;


const Th = styled.th`
  padding: 13px 16px;

  background: #f8fafc;

  color: #475569;

  text-align: left;

  font-size: 12px;

  white-space: nowrap;
`;


const Td = styled.td`
  padding: 14px 16px;

  border-top: 1px solid #f1f5f9;

  color: #475569;

  font-size: 13px;

  white-space: nowrap;
`;


/* =====================================================
   USER INFO
===================================================== */

const UserInfo = styled.div`
  display: flex;

  align-items: center;

  gap: 10px;
`;


const Avatar = styled.div`
  width: 36px;
  height: 36px;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 50%;

  background: #dbeafe;

  color: #1d4ed8;

  font-size: 13px;

  font-weight: 700;
`;


const UserDetails = styled.div``;


const UserName = styled.div`
  color: #0f172a;

  font-weight: 600;

  margin-bottom: 3px;
`;


const UserEmail = styled.div`
  color: #94a3b8;

  font-size: 11px;
`;


/* =====================================================
   ROLE
===================================================== */

const RoleBadge = styled.span`
  display: inline-flex;

  padding: 5px 9px;

  border-radius: 6px;

  background: ${({ role }) =>
    role === "Admin"
      ? "#ede9fe"
      : role === "HR Manager"
      ? "#fef3c7"
      : "#f1f5f9"};

  color: ${({ role }) =>
    role === "Admin"
      ? "#6d28d9"
      : role === "HR Manager"
      ? "#92400e"
      : "#475569"};

  font-size: 11px;

  font-weight: 600;
`;


/* =====================================================
   STATUS
===================================================== */

const StatusBadge = styled.span`
  display: inline-flex;

  padding: 5px 10px;

  border-radius: 20px;

  background: ${({ status }) =>
    status === "Active"
      ? "#dcfce7"
      : "#fee2e2"};

  color: ${({ status }) =>
    status === "Active"
      ? "#166534"
      : "#991b1b"};

  font-size: 11px;

  font-weight: 600;
`;


/* =====================================================
   ACTIONS
===================================================== */

const Actions = styled.div`
  display: flex;

  gap: 6px;
`;


const ActionButton = styled.button`
  padding: 6px 9px;

  border: 1px solid #cbd5e1;

  border-radius: 6px;

  background: white;

  color: #475569;

  font-size: 11px;

  cursor: pointer;

  &:hover {
    background: #f8fafc;
  }
`;


const DeleteButton = styled.button`
  padding: 6px 9px;

  border: 1px solid #fecaca;

  border-radius: 6px;

  background: #fff;

  color: #dc2626;

  font-size: 11px;

  cursor: pointer;

  &:hover {
    background: #fef2f2;
  }
`;


const EmptyState = styled.div`
  padding: 40px;

  text-align: center;

  color: #94a3b8;
`;


/* =====================================================
   MODAL
===================================================== */

const ModalOverlay = styled.div`
  position: fixed;

  inset: 0;

  z-index: 1000;

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 20px;

  background: rgba(15, 23, 42, 0.45);
`;


const Modal = styled.div`
  width: 100%;

  max-width: 550px;

  max-height: 90vh;

  overflow-y: auto;

  background: white;

  border-radius: 14px;

  box-shadow:
    0 20px 50px
    rgba(15, 23, 42, 0.2);
`;


const ModalHeader = styled.div`
  display: flex;

  justify-content: space-between;

  align-items: center;

  padding: 20px;

  border-bottom: 1px solid #e2e8f0;
`;


const ModalTitle = styled.h2`
  margin: 0;

  color: #0f172a;

  font-size: 19px;
`;


const CloseButton = styled.button`
  width: 32px;

  height: 32px;

  border: none;

  border-radius: 6px;

  background: #f1f5f9;

  color: #475569;

  font-size: 20px;

  cursor: pointer;
`;


/* =====================================================
   FORM
===================================================== */

const Form = styled.form`
  padding: 20px;
`;


const FormGroup = styled.div`
  display: flex;

  flex-direction: column;

  gap: 7px;

  margin-bottom: 16px;
`;


const FormRow = styled.div`
  display: grid;

  grid-template-columns:
    1fr 1fr;

  gap: 16px;

  @media (max-width: 550px) {
    grid-template-columns:
      1fr;
  }
`;


const ModalActions = styled.div`
  display: flex;

  justify-content: flex-end;

  gap: 10px;

  padding-top: 8px;
`;


const CancelButton = styled.button`
  padding: 10px 16px;

  border: 1px solid #cbd5e1;

  border-radius: 7px;

  background: white;

  color: #475569;

  font-size: 13px;

  font-weight: 600;

  cursor: pointer;
`;


const SaveButton = styled.button`
  padding: 10px 16px;

  border: none;

  border-radius: 7px;

  background: #2563eb;

  color: white;

  font-size: 13px;

  font-weight: 600;

  cursor: pointer;

  &:hover {
    background: #1d4ed8;
  }
`;


export default UserManagement
