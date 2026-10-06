import  { useMemo, useState } from "react";
import styled from "styled-components";

import {useNavigate} from "react-router-dom"

import NavSection from "../NavSection";
/* =========================================================
   MOCK DATA
========================================================= */

const employees = [
  {
    id: "EMP001",
    name: "Rahul Sharma",
    domain: "Development",
    employementType: "Full Time",
    joiningDate: "15 Apr 2025",
    probationEndDate: "14 Oct 2025",
    status: "Active",
    daysLeft: 12,
    image: "https://i.pravatar.cc/100?img=12",
  },
  {
    id: "EMP002",
    name: "Priya Nair",
    domain: "Marketing",
    employementType: "Internship",
    joiningDate: "10 May 2025",
    probationEndDate: "09 Nov 2025",
    status: "Active",
    daysLeft: 27,
    image: "https://i.pravatar.cc/100?img=47",
  },
  {
    id: "EMP003",
    name: "Amit Kumar",
    domain: "HR",
    employementType: "Internship",
    joiningDate: "01 May 2025",
    probationEndDate: "31 Oct 2025",
    status: "InActive",
    daysLeft: 8,
    image: "https://i.pravatar.cc/100?img=11",
  },
  {
    id: "EMP004",
    name: "Sneha Reddy",
    domain: "Sales",
    employementType: "Full Time",
    joiningDate: "20 Apr 2025",
    probationEndDate: "19 Oct 2025",
    status: "InActive",
    daysLeft: "-",
    image: "https://i.pravatar.cc/100?img=32",
  },
  {
    id: "EMP005",
    name: "Karthik V",
    domain: "Design",
    employementType: "Internship",
    joiningDate: "05 May 2025",
    probationEndDate: "04 Nov 2025",
    status: "InActive",
    daysLeft: "-",
    image: "https://i.pravatar.cc/100?img=13",
  },
  {
    id: "EMP006",
    name: "Arjun Reddy",
    domain: "Development",
    employementType: "Full Time",
    joiningDate: "12 Apr 2025",
    probationEndDate: "11 Oct 2025",
    status: "Active",
    daysLeft: 9,
    image: "https://i.pravatar.cc/100?img=15",
  },
  {
    id: "EMP007",
    name: "Ananya Rao",
    domain: "Marketing",
    employementType: "Full Time",
    joiningDate: "15 May 2025",
    probationEndDate: "14 Nov 2025",
    status: "Active",
    daysLeft: 32,
    image: "https://i.pravatar.cc/100?img=44",
  },
  {
    id: "EMP008",
    name: "Vikram Singh",
    domain: "Development",
    employementType: "Internship",
    joiningDate: "20 Apr 2025",
    probationEndDate: "19 Oct 2025",
    status: "InActive",
    daysLeft: 5,
    image: "https://i.pravatar.cc/100?img=68",
  },
  {
    id: "EMP009",
    name: "Meena Joseph",
    domain: "HR",
    employementType: "Full Time",
    joiningDate: "05 Apr 2025",
    probationEndDate: "04 Oct 2025",
    status: "InActive",
    daysLeft: "-",
    image: "https://i.pravatar.cc/100?img=49",
  },
  {
    id: "EMP010",
    name: "Rohit Kumar",
    domain: "Sales",
    employementType: "Full Time",
    joiningDate: "18 Apr 2025",
    probationEndDate: "17 Oct 2025",
    status: "Active",
    daysLeft: 15,
    image: "https://i.pravatar.cc/100?img=60",
  },
  {
    id: "EMP011",
    name: "Divya Sharma",
    domain: "Design",
    employementType: "Internship",
    joiningDate: "11 May 2025",
    probationEndDate: "10 Nov 2025",
    status: "InActive",
    daysLeft: "-",
    image: "https://i.pravatar.cc/100?img=45",
  },
  {
    id: "EMP012",
    name: "Manoj Kumar",
    domain: "Development",
    employementType: "Full Time",
    joiningDate: "02 May 2025",
    probationEndDate: "01 Nov 2025",
    status: "Active",
    daysLeft: "-",
    image: "https://i.pravatar.cc/100?img=51",
  },
  {
    id: "EMP013",
    name: "Swathi R",
    domain: "Marketing",
    employementType: "Full Time",
    joiningDate: "09 May 2025",
    probationEndDate: "08 Nov 2025",
    status: "Active",
    daysLeft: 24,
    image: "https://i.pravatar.cc/100?img=25",
  },
  {
    id: "EMP014",
    name: "Suresh Babu",
    domain: "HR",
    employementType: "Internship",
    joiningDate: "13 Apr 2025",
    probationEndDate: "12 Oct 2025",
    status: "InActive",
    daysLeft: 10,
    image: "https://i.pravatar.cc/100?img=52",
  },
  {
    id: "EMP015",
    name: "Neha Kapoor",
    domain: "Sales",
    employementType: "Internship",
    joiningDate: "01 May 2025",
    probationEndDate: "31 Oct 2025",
    status: "InActive",
    daysLeft: "-",
    image: "https://i.pravatar.cc/100?img=48",
  },
  {
    id: "EMP016",
    name: "Akash Verma",
    domain: "Design",
    employementType: "Full Time",
    joiningDate: "17 May 2025",
    probationEndDate: "16 Nov 2025",
    status: "Active",
    daysLeft: 38,
    image: "https://i.pravatar.cc/100?img=14",
  },
];

const ProbationDashboard=()=> {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [domainFilter, setDomainFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showFilter, setShowFilter] = useState(false);

  const itemsPerPage = 5;

  const navigate = useNavigate();

const handleViewDetails = (employeeId) => {
  navigate(`/probation/${employeeId}`);
};

  /* =======================================================
     COUNTS
  ======================================================= */

  const totalEmployees = employees.length;

  const inProgressCount = employees.filter(
    (employee) => employee.status === "In Progress"
  ).length;

  const completedCount = employees.filter(
    (employee) => employee.status === "Completed"
  ).length;

  const dueSoonCount = employees.filter(
    (employee) => employee.status === "Due Soon"
  ).length;

  const extendedCount = employees.filter(
    (employee) => employee.status === "Extended"
  ).length;

  /* =======================================================
     FILTERING
  ======================================================= */

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        employee.name.toLowerCase().includes(searchValue) ||
        employee.id.toLowerCase().includes(searchValue) ||
        employee.domain.toLowerCase().includes(searchValue) ||
        employee.designation.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || employee.status === statusFilter;

      const matchesDomain =
        domainFilter === "All" || employee.domain === domainFilter;

      return matchesSearch && matchesStatus && matchesDomain;
    });
  }, [search, statusFilter, domainFilter]);

  /* =======================================================
     PAGINATION
  ======================================================= */

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentEmployees = filteredEmployees.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleFilterChange = (setter, value) => {
    setter(value);
    setCurrentPage(1);
  };

  /* =======================================================
     EXPORT CSV
  ======================================================= */

  const exportCSV = () => {
    const headers = [
      "Employee ID",
      "Name",
      "Domain",
      "Designation",
      "Joining Date",
      "Probation End Date",
      "Status",
      "Days Left",
    ];

    const rows = filteredEmployees.map((employee) => [
      employee.id,
      employee.name,
      employee.domain,
      employee.designation,
      employee.joiningDate,
      employee.probationEndDate,
      employee.status,
      employee.daysLeft,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "probation-report.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <AppContainer>
      <NavSection/>
      <Main $sidebarOpen={sidebarOpen}>

        <Header>
          <SearchBox>
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search employees, domains, etc..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </SearchBox>

          <HeaderRight>
            <Notification>
              ♧
              <NotificationBadge>3</NotificationBadge>
            </Notification>

            <UserInfo>
              <Avatar src="https://i.pravatar.cc/100?img=12" />

              <UserText>
                <strong>Vishnu Vardhan</strong>
                <small>Admin</small>
              </UserText>

              <span>⌄</span>
            </UserInfo>
          </HeaderRight>
        </Header>

        {/* ===================================================
            CONTENT
        =================================================== */}

        <Content>
          {/* TITLE */}
          <TitleRow>
            <TitleSection>
              <TitleIcon>♙</TitleIcon>

              <div>
                <h1>Probation Dashboard</h1>
                <p>
                  Track and manage employee probation status across all
                  domains.
                </p>
              </div>
            </TitleSection>
          </TitleRow>

          {/* =================================================
              STAT CARDS
          ================================================= */}

          <StatsGrid>
            <StatCard type="blue">
              <StatIcon type="blue">♙</StatIcon>

              <StatContent>
                <StatTitle>Total Employees on Probation</StatTitle>
                <StatNumber>{totalEmployees}</StatNumber>

                <StatChange positive>
                  ↑ 12% <span>from last month</span>
                </StatChange>
              </StatContent>
            </StatCard>

            <StatCard type="green">
              <StatIcon type="green">◷</StatIcon>

              <StatContent>
                <StatTitle>In Progress</StatTitle>
                <StatNumber>{inProgressCount}</StatNumber>

                <StatChange positive>
                  ↑ 8% <span>from last month</span>
                </StatChange>
              </StatContent>
            </StatCard>

            <StatCard type="completed">
              <StatIcon type="completed">✓</StatIcon>

              <StatContent>
                <StatTitle>Completed</StatTitle>
                <StatNumber>{completedCount}</StatNumber>

                <StatChange positive>
                  ↑ 5% <span>from last month</span>
                </StatChange>
              </StatContent>
            </StatCard>

            <StatCard type="orange">
              <StatIcon type="orange">▣</StatIcon>

              <StatContent>
                <StatTitle>Due Soon</StatTitle>
                <StatSub>(Within 15 Days)</StatSub>
                <StatNumber>{dueSoonCount}</StatNumber>

                <StatChange positive>
                  ↑ 3% <span>from last month</span>
                </StatChange>
              </StatContent>
            </StatCard>

            <StatCard type="purple">
              <StatIcon type="purple">↗</StatIcon>

              <StatContent>
                <StatTitle>Extended</StatTitle>
                <StatNumber>{extendedCount}</StatNumber>

                <StatChange negative>
                  ↓ 2% <span>from last month</span>
                </StatChange>
              </StatContent>
            </StatCard>
          </StatsGrid>

          {/* =================================================
              CHARTS
          ================================================= */}
          
          <ChartsGrid>
            {/* DONUT */}
            <ChartCard>
              <ChartHeader>
                <h3>Probation Status Overview</h3>
              </ChartHeader>

              <DonutContainer>
                <Donut
                  style={{
                    background: `conic-gradient(
                      #2878ed 0% 49%,
                      #20b486 49% 73%,
                      #ff9f43 73% 87%,
                      #8f5cf7 87% 100%
                    )`,
                  }}
                >
                  <DonutInner>
                    <strong>{totalEmployees}</strong>
                    <span>Total</span>
                  </DonutInner>
                </Donut>

                <Legend>
                  <LegendRow>
                    <LegendDot color="#2878ed" />
                    <span>In Progress</span>
                    <strong>{inProgressCount}</strong>
                    <small>49%</small>
                  </LegendRow>

                  <LegendRow>
                    <LegendDot color="#20b486" />
                    <span>Completed</span>
                    <strong>{completedCount}</strong>
                    <small>24%</small>
                  </LegendRow>

                  <LegendRow>
                    <LegendDot color="#ff9f43" />
                    <span>Due Soon</span>
                    <strong>{dueSoonCount}</strong>
                    <small>14%</small>
                  </LegendRow>

                  <LegendRow>
                    <LegendDot color="#8f5cf7" />
                    <span>Extended</span>
                    <strong>{extendedCount}</strong>
                    <small>13%</small>
                  </LegendRow>
                </Legend>
              </DonutContainer>
            </ChartCard>

            {/* TREND */}
            <ChartCard>
              <ChartHeader>
                <h3>Probation Trend</h3>

                <ChartLegend>
                  <span>
                    <LegendDot color="#2878ed" />
                    In Progress
                  </span>

                  <span>
                    <LegendDot color="#20b486" />
                    Completed
                  </span>
                </ChartLegend>
              </ChartHeader>

              <LineChart>
                <YAxis>
                  <span>50</span>
                  <span>40</span>
                  <span>30</span>
                  <span>20</span>
                  <span>10</span>
                  <span>0</span>
                </YAxis>

                <ChartArea>
                  <GridLines>
                    {[1, 2, 3, 4, 5].map((item) => (
                      <GridLine key={item} />
                    ))}
                  </GridLines>

                  <TrendLine
                    points="0,82 20,76 40,62 60,55 80,42 100,30"
                  />

                  <TrendLine
                    green
                    points="0,125 20,113 40,105 60,100 80,94 100,79"
                  />

                  <XAxis>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                    <span>Aug</span>
                    <span>Sep</span>
                  </XAxis>
                </ChartArea>
              </LineChart>
            </ChartCard>

            {/* DOMAIN CHART */}
            <ChartCard>
              <ChartHeader>
                <h3>Domain-wise Probation</h3>

                <ChartLegend>
                  <span>
                    <LegendDot color="#2878ed" />
                    In Progress
                  </span>

                  <span>
                    <LegendDot color="#20b486" />
                    Completed
                  </span>
                </ChartLegend>
              </ChartHeader>

              <BarChart>
                {[
                  ["Development", 22, 12],
                  ["Marketing", 10, 6],
                  ["HR", 8, 5],
                  ["Sales", 7, 4],
                  ["Design", 5, 3],
                ].map(([domain, progress, completed]) => (
                  <BarGroup key={domain}>
                    <Bars>
                      <Bar blue height={`${progress * 4}%`}>
                        <BarValue>{progress}</BarValue>
                      </Bar>

                      <Bar green height={`${completed * 4}%`}>
                        <BarValue>{completed}</BarValue>
                      </Bar>
                    </Bars>

                    <BarLabel>{domain}</BarLabel>
                  </BarGroup>
                ))}
              </BarChart>
            </ChartCard>
          </ChartsGrid>


          {/* =================================================
              TABLE
          ================================================= */}

          <TableCard>
            <TableHeader>
              <TableTitle>
                <span>♙</span>
                <h3>Probation Details</h3>
              </TableTitle>

              <TableActions>
                <TableSearch>
                  <span>⌕</span>

                  <input
                    placeholder="Search by name, domain, or status..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </TableSearch>

                <FilterButton onClick={() => setShowFilter(!showFilter)}>
                  ⚱ Filter
                </FilterButton>

                <ExportButton onClick={exportCSV}>
                  ↓ Export
                </ExportButton>
              </TableActions>
            </TableHeader>

            {/* FILTER PANEL */}

            {showFilter && (
              <FilterPanel>
                <FilterItem>
                  <label>Status</label>

                  <select
                    value={statusFilter}
                    onChange={(e) =>
                      handleFilterChange(
                        setStatusFilter,
                        e.target.value
                      )
                    }
                  >
                    <option>All</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                    <option>Due Soon</option>
                    <option>Extended</option>
                  </select>
                </FilterItem>

                <FilterItem>
                  <label>Domain</label>

                  <select
                    value={domainFilter}
                    onChange={(e) =>
                      handleFilterChange(
                        setDomainFilter,
                        e.target.value
                      )
                    }
                  >
                    <option>All</option>
                    <option>Development</option>
                    <option>Marketing</option>
                    <option>HR</option>
                    <option>Sales</option>
                    <option>Design</option>
                  </select>
                </FilterItem>

                <ClearButton
                  onClick={() => {
                    setStatusFilter("All");
                    setDomainFilter("All");
                    setSearch("");
                    setCurrentPage(1);
                  }}
                >
                  Clear
                </ClearButton>
              </FilterPanel>
            )}

            {/* TABLE */}

            <TableWrapper>
              <Table>
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Domain</th>
                    <th>Employement Type</th>
                    <th>Joining Date</th>
                    <th>Probation End Date</th>
                    <th>Status</th>
                    <th>Days Left</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {currentEmployees.length > 0 ? (
                    currentEmployees.map((employee) => (
                      <tr key={employee.id}>
                        <td>
                          <EmployeeId>
                            <img src={employee.image} alt="" />
                            {employee.id}
                          </EmployeeId>
                        </td>

                        <td>
                          <strong>{employee.name}</strong>
                        </td>

                        <td>{employee.domain}</td>

                        <td>{employee.employementType}</td>

                        <td>{employee.joiningDate}</td>

                        <td>{employee.probationEndDate}</td>

                        <td>
                          <StatusBadge status={employee.status}>
                            {employee.status}
                          </StatusBadge>
                        </td>

                        <td>
                          <DaysLeft status={employee.status}>
                            {employee.daysLeft}
                          </DaysLeft>
                        </td>

                        <td>
                          <ActionGroup>
                            <ViewButton
                              onClick={() => handleViewDetails(employee.id)
                              }
                            >
                              View
                            </ViewButton>

                            <MoreButton>⋮</MoreButton>
                          </ActionGroup>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <EmptyCell colSpan="9">
                        No employees found
                      </EmptyCell>
                    </tr>
                  )}
                </tbody>
              </Table>
            </TableWrapper>

            {/* PAGINATION */}

            <Pagination>
              <Showing>
                Showing{" "}
                {filteredEmployees.length === 0
                  ? 0
                  : startIndex + 1}
                –
                {Math.min(
                  startIndex + itemsPerPage,
                  filteredEmployees.length
                )}{" "}
                of {filteredEmployees.length}
              </Showing>

              <PageButtons>
                <PageButton
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(page - 1, 1))
                  }
                >
                  ‹
                </PageButton>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <PageButton
                    key={page}
                    active={currentPage === page}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </PageButton>
                ))}

                <PageButton
                  disabled={
                    currentPage === totalPages || totalPages === 0
                  }
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.min(page + 1, totalPages)
                    )
                  }
                >
                  ›
                </PageButton>
              </PageButtons>
            </Pagination>
          </TableCard>

          {/* =================================================
              QUICK ACTIONS
          ================================================= */}

          <QuickActions>
            <QuickCard type="blue">
              <QuickIcon>♙</QuickIcon>

              <div>
                <strong>View All Employees</strong>
                <small>Go to employee list</small>
              </div>

              <span>→</span>
            </QuickCard>

            <QuickCard type="purple">
              <QuickIcon>▣</QuickIcon>

              <div>
                <strong>View Probation Calendar</strong>
                <small>Check important dates</small>
              </div>

              <span>→</span>
            </QuickCard>

            <QuickCard type="green">
              <QuickIcon>⌁</QuickIcon>

              <div>
                <strong>Generate Report</strong>
                <small>Get probation report</small>
              </div>

              <span>→</span>
            </QuickCard>

            <QuickCard type="orange">
              <QuickIcon>⚙</QuickIcon>

              <div>
                <strong>Manage Settings</strong>
                <small>Configure probation rules</small>
              </div>

              <span>→</span>
            </QuickCard>
          </QuickActions>
        </Content>
      </Main>

      {/* =====================================================
          EMPLOYEE MODAL
      ===================================================== */}

      {selectedEmployee && (
        <ModalOverlay onClick={() => setSelectedEmployee(null)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2>Employee Details</h2>

              <CloseButton
                onClick={() => setSelectedEmployee(null)}
              >
                ×
              </CloseButton>
            </ModalHeader>

            <ModalProfile>
              <img
                src={selectedEmployee.image}
                alt={selectedEmployee.name}
              />

              <div>
                <h3>{selectedEmployee.name}</h3>
                <p>{selectedEmployee.designation}</p>
              </div>
            </ModalProfile>

            <DetailsGrid>
              <DetailItem>
                <label>Employee ID</label>
                <strong>{selectedEmployee.id}</strong>
              </DetailItem>

              <DetailItem>
                <label>Domain</label>
                <strong>{selectedEmployee.domain}</strong>
              </DetailItem>

              <DetailItem>
                <label>Joining Date</label>
                <strong>{selectedEmployee.joiningDate}</strong>
              </DetailItem>

              <DetailItem>
                <label>Probation End Date</label>
                <strong>{selectedEmployee.probationEndDate}</strong>
              </DetailItem>

              <DetailItem>
                <label>Status</label>
                <StatusBadge status={selectedEmployee.status}>
                  {selectedEmployee.status}
                </StatusBadge>
              </DetailItem>

              <DetailItem>
                <label>Days Left</label>
                <strong>{selectedEmployee.daysLeft}</strong>
              </DetailItem>
            </DetailsGrid>

            <ModalFooter>
              <CloseModalButton
                onClick={() => setSelectedEmployee(null)}
              >
                Close
              </CloseModalButton>
            </ModalFooter>
          </Modal>
        </ModalOverlay>
      )}
    </AppContainer>
  );
}

/* =========================================================
   STYLES
========================================================= */

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background:  #f8e7c9;
  color:  #064e3b;
  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
`;

const Sidebar = styled.aside`
  width: ${(props) => (props.$open ? "248px" : "76px")};
  background: #0d2346;
  color:  #064e3b;
  min-height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 20;
  transition: width 0.25s ease;
  overflow-y: auto;
`;

const Main = styled.main`
  margin-left: ${(props) =>
    props.$sidebarOpen ? "248px" : "76px"};
  width: calc(
    100% - ${(props) => (props.$sidebarOpen ? "248px" : "76px")}
  );
  transition: all 0.25s ease;
`;

const Header = styled.header`
  height: 58px;
  background: white;
  border-bottom: 1px solid #e4ebf4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const SearchBox = styled.div`
  width: 335px;
  height: 36px;
  border: 1px solid #dbe5f0;
  border-radius: 7px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  gap: 8px;
  color: #7590b2;

  input {
    border: 0;
    outline: 0;
    width: 100%;
    font-size: 12px;
    color:  #064e3b;

    &::placeholder {
      color: #91a5bf;
    }
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
`;

const Notification = styled.div`
  position: relative;
  font-size: 22px;
  color:  #064e3b;
  cursor: pointer;
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 18px;
  height: 18px;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  strong {
    font-size: 14px;
  }

  small {
    color: #8195b2;
    font-size: 12px;
  }
`;

const Content = styled.div`
  padding: 24px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  h1 {
    font-size: 22px;
    margin: 0 0 4px;
    color:  #064e3b;
  }

  p {
    margin: 0;
    font-size: 13px;
    color:  #064e3b;
  }
`;

const TitleIcon = styled.div`
  font-size: 34px;
  color:  #064e3b;
`;

const DateSelector = styled.div`
  height: 34px;
  border: 1px solid #dce7f4;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 0 11px;
  background: white;

  select {
    border: 0;
    outline: 0;
    font-size: 11px;
    color:  #064e3b;
    background: transparent;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 13px;
  margin-bottom: 20px;
`;

const StatCard = styled.div`
  min-height: 104px;
  border: 1px solid
    ${(props) =>
      props.type === "blue"
        ? "#bddcff"
        : props.type === "green"
        ? "#b9eadc"
        : props.type === "completed"
        ? "#bdeadd"
        : props.type === "orange"
        ? "#ffddbd"
        : "#dfcaff"};
  background: white;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  gap: 13px;
`;

const StatIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;

  background: ${(props) =>
    props.type === "blue"
      ? "#e5f1ff"
      : props.type === "green"
      ? "#dcf8ed"
      : props.type === "completed"
      ? "#d9f5e9"
      : props.type === "orange"
      ? "#fff0df"
      : "#eee5ff"};

  color: ${(props) =>
    props.type === "blue"
      ? "#2477e9"
      : props.type === "green"
      ? "#11a76c"
      : props.type === "completed"
      ? "#10a66a"
      : props.type === "orange"
      ? "#ff9137"
      : "#8852e8"};
`;

const StatContent = styled.div`
  min-width: 0;
`;

const StatTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  color:  #064e3b;
  line-height: 15px;
`;

const StatSub = styled.span`
  font-size: 11px;
  color:  black;
`;

const StatNumber = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: black;
  margin: 7px 0 4px;
`;

const StatChange = styled.div`
  font-size: 12px;
  color: ${(props) =>
    props.negative ? "#ef4444" : "#16a878"};

  span {
    color:  black;
  }
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1.05fr 1.1fr 1.05fr;
  gap: 14px;
  margin-bottom: 18px;
`;

const ChartCard = styled.div`
  background: white;
  border: 1px solid #dde8f4;
  border-radius: 8px;
  padding: 17px;
  min-height: 210px;
`;

const ChartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;

  h3 {
    margin: 0;
    font-size: 15px;
    color:  #064e3b;
  }
`;

const DonutContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 155px;
`;

const Donut = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DonutInner = styled.div`
  width: 78px;
  height: 78px;
  background: white;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  strong {
    font-size: 24px;
    color: #153768;
  }

  span {
    font-size: 12px;
    color: #7c91ad;
  }
`;

const Legend = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
`;

const LegendRow = styled.div`
  display: grid;
  grid-template-columns: 10px 80px 25px 25px;
  gap: 7px;
  align-items: center;
  font-size: 13px;
  color: #46607f;

  strong {
    color: #183966;
  }

  small {
    color: #7c91ad;
  }
`;

const LegendDot = styled.span`
  width: 8px;
  height: 8px;
  background: ${(props) => props.color};
  border-radius: 2px;
  display: inline-block;
`;

const ChartLegend = styled.div`
  display: flex;
  gap: 14px;
  font-size: 12px;
  color: #506987;

  span {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

const LineChart = styled.div`
  height: 155px;
  display: flex;
`;

const YAxis = styled.div`
  width: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 12px;
  color: #7890ad;
  padding-bottom: 18px;
`;

const ChartArea = styled.div`
  position: relative;
  flex: 1;
  height: 135px;
  margin-top: 3px;
`;

const GridLines = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const GridLine = styled.div`
  height: 1px;
  width: 100%;
  background: #e9f0f7;
`;

const TrendLine = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 100%;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: ${(props) =>
      props.green
        ? "none"
        : "none"};
    clip-path: polygon(
      ${(props) => props.points}
    );
  }

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    top: ${(props) => (props.green ? "65%" : "38%")};
    left: 0;
    background: ${(props) =>
      props.green ? "#20b486" : "#2878ed"};
    transform: rotate(-5deg);
    transform-origin: left;
    border-radius: 5px;
  }
`;

const XAxis = styled.div`
  position: absolute;
  bottom: -17px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #738aa6;
`;

const BarChart = styled.div`
  height: 155px;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  border-bottom: 1px solid #dfe8f2;
  padding: 0 5px;
`;

const BarGroup = styled.div`
  height: 100%;
  width: 18%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

const Bars = styled.div`
  height: 120px;
  display: flex;
  gap: 3px;
  align-items: flex-end;
`;

const Bar = styled.div`
  width: 17px;
  height: ${(props) => props.height};
  min-height: 10px;
  background: ${(props) =>
    props.blue ? "#2878ed" : "#20b486"};
  position: relative;
  border-radius: 3px 3px 0 0;
`;

const BarValue = styled.span`
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: #26466e;
`;

const BarLabel = styled.div`
  margin-top: 8px;
  font-size: 11px;
  color: #687f9e;
  white-space: nowrap;
`;

const TableCard = styled.div`
  background: white;
  border: 1px solid #dce7f3;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 18px;
`;

const TableHeader = styled.div`
  min-height: 64px;
  padding: 12px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
`;

const TableTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  span {
    color:  #064e3b;
    font-size: 22px;
  }

  h3 {
    margin: 0;
    font-size: 15px;
    color: #064e3b;
  }
`;

const TableActions = styled.div`
  display: flex;
  gap: 8px;
`;

const TableSearch = styled.div`
  width: 250px;
  height: 32px;
  border: 1px solid #dbe6f2;
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: 0 9px;
  gap: 6px;

  input {
    border: 0;
    outline: 0;
    width: 100%;
    font-size: 10px;
  }
`;

const FilterButton = styled.button`
  border: 1px solid #d8e5f2;
  background: white;
  border-radius: 5px;
  padding: 0 13px;
  height: 32px;
  font-size: 12px;
  color:  #064e3b;
  cursor: pointer;
`;

const ExportButton = styled.button`
  border: 0;
  background: #176ce2;
  color: white;
  border-radius: 5px;
  padding: 0 14px;
  height: 32px;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background: #0d5dca;
  }
`;

const FilterPanel = styled.div`
  background: #f7faff;
  border-top: 1px solid #e5edf6;
  border-bottom: 1px solid #e5edf6;
  padding: 13px 16px;
  display: flex;
  align-items: flex-end;
  gap: 15px;
`;

const FilterItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  label {
    font-size: 12px;
    color:  #064e3b;
  }

  select {
    height: 32px;
    min-width: 150px;
    border: 1px solid #d6e2ef;
    border-radius: 5px;
    background: white;
    padding: 0 8px;
    font-size: 12px;
    outline: none;
  }
`;

const ClearButton = styled.button`
  height: 32px;
  border: 1px solid #d5e2ef;
  background: white;
  border-radius: 5px;
  padding: 0 15px;
  cursor: pointer;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 1050px;

  th {
    background: #f8fbff;
    padding: 11px 10px;
    text-align: left;
    font-size: 13px;
    color:  #064e3b;
    font-weight: 700;
    white-space: nowrap;
  }

  td {
    padding: 10px;
    border-top: 1px solid #edf2f7;
    font-size: 13px;
    color: #4c6584;
    white-space: nowrap;
  }

  tbody tr:hover {
    background: #f9fbfe;
  }
`;

const EmployeeId = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  color: #284d7c;

  img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }
`;

const StatusBadge = styled.span`
  padding: 5px 9px;
  border-radius: 7px;
  font-size: 12px;
  font-weight: 600;

  background: ${(props) =>
    props.status === "In Progress"
      ? "#e4f1ff"
      : props.status === "Completed"
      ? "#dcf7ec"
      : props.status === "Due Soon"
      ? "#ffead7"
      : "#eee3ff"};

  color: ${(props) =>
    props.status === "In Progress"
      ? "#2273d7"
      : props.status === "Completed"
      ? "#07965f"
      : props.status === "Due Soon"
      ? "#e67a19"
      : "#7841ce"};
`;

const DaysLeft = styled.span`
  color: ${(props) =>
    props.status === "Due Soon" ? "#ff6b32" : "#536d8c"};
  font-weight: ${(props) =>
    props.status === "Due Soon" ? "700" : "400"};
`;

const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ViewButton = styled.button`
  height: 25px;
  min-width: 54px;
  border: 1px solid #d9e5f2;
  background: white;
  color: #196bd8;
  border-radius: 5px;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background: #eef6ff;
  }
`;

const MoreButton = styled.button`
  border: 0;
  background: transparent;
  color: #54708f;
  cursor: pointer;
  font-size: 19px;
`;

const EmptyCell = styled.td`
  text-align: center !important;
  padding: 30px !important;
  color: #8095b0 !important;
`;

const Pagination = styled.div`
  padding: 11px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #edf2f7;
`;

const Showing = styled.div`
  font-size: 12px;
  color: #6f85a1;
`;

const PageButtons = styled.div`
  display: flex;
  gap: 5px;
`;

const PageButton = styled.button`
  width: 30px;
  height: 30px;
  border: 1px solid #dbe6f1;
  background: ${(props) =>
    props.active ? "#176ce2" : "white"};
  color: ${(props) =>
    props.active ? "white" : "#526b8b"};
  border-radius: 5px;
  font-size: 10px;
  cursor: pointer;

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
`;

const QuickCard = styled.div`
  height: 65px;
  background: white;
  border: 1px solid
    ${(props) =>
      props.type === "blue"
        ? "#bcdcff"
        : props.type === "purple"
        ? "#dbcaff"
        : props.type === "green"
        ? "#bce9d9"
        : "#ffd5b2"};
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 15px;

  > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  strong {
    font-size: 12px;
    color: #173968;
  }

  small {
    font-size: 10px;
    color: #7b90aa;
  }

  > span:last-child {
    font-size: 19px;
    color: #2374dc;
  }
`;

const QuickIcon = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: #eaf3ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #2374dc;
`;

/* =========================================================
   MODAL
========================================================= */

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(9, 27, 53, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  padding: 20px;
`;

const Modal = styled.div`
  width: 500px;
  max-width: 100%;
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const ModalHeader = styled.div`
  padding: 18px 20px;
  border-bottom: 1px solid #e6edf5;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
    font-size: 17px;
    color: #173866;
  }
`;

const CloseButton = styled.button`
  border: 0;
  background: transparent;
  font-size: 27px;
  color: #7086a1;
  cursor: pointer;
`;

const ModalProfile = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 14px;

  img {
    width: 65px;
    height: 65px;
    border-radius: 50%;
  }

  h3 {
    margin: 0 0 5px;
    color: #173866;
  }

  p {
    margin: 0;
    color: #7187a3;
    font-size: 14px;
  }
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  padding: 0 20px 20px;
`;

const DetailItem = styled.div`
  background: #f7faff;
  border: 1px solid #e3ebf4;
  border-radius: 7px;
  padding: 11px;

  label {
    display: block;
    font-size: 13px;
    color: #8095ae;
    margin-bottom: 5px;
  }

  strong {
    font-size: 13px;
    color: #27476f;
  }
`;

const ModalFooter = styled.div`
  padding: 14px 20px;
  border-top: 1px solid #e6edf5;
  display: flex;
  justify-content: flex-end;
`;

const CloseModalButton = styled.button`
  border: 0;
  background: #176ce2;
  color: white;
  border-radius: 6px;
  padding: 9px 20px;
  cursor: pointer;
`;

/* =========================================================
   RESPONSIVE
========================================================= */

const GlobalStyle = styled.div`
  @media (max-width: 1200px) {
    ${StatsGrid} {
      grid-template-columns: repeat(3, 1fr);
    }

    ${ChartsGrid} {
      grid-template-columns: 1fr 1fr;
    }

    ${ChartsGrid} > ${ChartCard}:last-child {
      grid-column: span 2;
    }

    ${QuickActions} {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 800px) {
    ${StatsGrid} {
      grid-template-columns: 1fr 1fr;
    }

    ${ChartsGrid} {
      grid-template-columns: 1fr;
    }

    ${ChartsGrid} > ${ChartCard}:last-child {
      grid-column: span 1;
    }

    ${TitleRow} {
      flex-direction: column;
      align-items: flex-start;
      gap: 15px;
    }

    ${Header} {
      padding: 0 12px;
    }

    ${SearchBox} {
      width: 220px;
    }

    ${QuickActions} {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 600px) {
    ${Sidebar} {
      width: 70px;
    }

    ${Main} {
      margin-left: 70px;
      width: calc(100% - 70px);
    }

    ${Content} {
      padding: 15px;
    }

    ${StatsGrid} {
      grid-template-columns: 1fr;
    }

    ${UserText} {
      display: none;
    }

    ${HeaderRight} {
      gap: 10px;
    }

    ${TableActions} {
      flex-wrap: wrap;
    }

    ${TableHeader} {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

export default ProbationDashboard;