import React, { useState } from "react";

import NavSection from "../NavSection";
import {
  PageContainer,
  Header,
  TitleSection,
  Title,
  Subtitle,
  AddButton,
  Toolbar,
  SearchInput,
  DomainGrid,
  DomainCard,
  CardHeader,
  DomainName,
  DomainDescription,
  EmployeeCount,
  EmployeeBadge,
  ActionButtons,
  EditButton,
  DeleteButton,
  ViewButton,
  ModalOverlay,
  Modal,
  ModalTitle,
  FormGroup,
  Label,
  Input,
  TextArea,
  ModalActions,
  CancelButton,
  SaveButton,
  EmployeeList,
  EmployeeItem,
  EmployeeInfo,
  EmployeeName,
  EmployeeRole,
  EmptyState,
} from "./styledComponents";

const initialDomains = [
  {
    id: 1,
    name: "Frontend Development",
    description: "React, JavaScript, HTML, CSS and UI development",
    employees: [
      { id: 101, name: "Rahul Kumar", role: "Frontend Developer" },
      { id: 102, name: "Priya Sharma", role: "React Developer" },
      { id: 103, name: "Arun Kumar", role: "UI Developer" },
    ],
  },
  {
    id: 2,
    name: "Backend Development",
    description: "Node.js, Java, APIs and database development",
    employees: [
      { id: 201, name: "Suresh Reddy", role: "Backend Developer" },
      { id: 202, name: "Anil Kumar", role: "Node.js Developer" },
    ],
  },
  {
    id: 3,
    name: "QA & Testing",
    description: "Manual testing, automation and quality assurance",
    employees: [
      { id: 301, name: "Sneha Reddy", role: "QA Engineer" },
      { id: 302, name: "Kiran Kumar", role: "Automation Tester" },
    ],
  },
  {
    id: 4,
    name: "HR & Administration",
    description: "Human resources and employee administration",
    employees: [
      { id: 401, name: "Meena Devi", role: "HR Executive" },
    ],
  },
];

const Domains = () => {
  const [domains, setDomains] = useState(initialDomains);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showEmployees, setShowEmployees] = useState(false);

  const [selectedDomain, setSelectedDomain] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  // Open Add Domain modal
  const handleAddDomain = () => {
    setSelectedDomain(null);

    setFormData({
      name: "",
      description: "",
    });

    setShowModal(true);
  };

  // Open Edit Domain modal
  const handleEditDomain = (domain) => {
    setSelectedDomain(domain);

    setFormData({
      name: domain.name,
      description: domain.description,
    });

    setShowModal(true);
  };

  // Add / Edit domain
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter domain name");
      return;
    }

    if (selectedDomain) {
      // Edit existing domain
      setDomains((prevDomains) =>
        prevDomains.map((domain) =>
          domain.id === selectedDomain.id
            ? {
                ...domain,
                name: formData.name,
                description: formData.description,
              }
            : domain
        )
      );
    } else {
      // Add new domain
      const newDomain = {
        id: Date.now(),
        name: formData.name,
        description: formData.description,
        employees: [],
      };

      setDomains((prevDomains) => [...prevDomains, newDomain]);
    }

    setShowModal(false);
  };

  // Delete domain
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this domain?"
    );

    if (!confirmDelete) return;

    setDomains((prevDomains) =>
      prevDomains.filter((domain) => domain.id !== id)
    );
  };

  // View employees
  const handleViewEmployees = (domain) => {
    setSelectedDomain(domain);
    setShowEmployees(true);
  };

  // Search
  const filteredDomains = domains.filter((domain) =>
    domain.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageContainer>
        <NavSection/>
      <Header>
        <TitleSection>
          <Title>Domain Management</Title>
          <Subtitle>
            Manage domains and view employees assigned to each domain.
          </Subtitle>
        </TitleSection>

        <AddButton onClick={handleAddDomain}>
          + Add Domain
        </AddButton>
      </Header>

      <Toolbar>
        <SearchInput
          type="text"
          placeholder="Search domains..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Toolbar>

      <DomainGrid>
        {filteredDomains.length > 0 ? (
          filteredDomains.map((domain) => (
            <DomainCard key={domain.id}>
              <CardHeader>
                <div>
                  <DomainName>{domain.name}</DomainName>

                  <DomainDescription>
                    {domain.description}
                  </DomainDescription>
                </div>

                <EmployeeBadge>
                  {domain.employees.length} Employees
                </EmployeeBadge>
              </CardHeader>

              <EmployeeCount>
                Employees assigned:{" "}
                <strong>{domain.employees.length}</strong>
              </EmployeeCount>

              <ActionButtons>
                <ViewButton
                  onClick={() => handleViewEmployees(domain)}
                >
                  View Employees
                </ViewButton>

                <EditButton
                  onClick={() => handleEditDomain(domain)}
                >
                  Edit
                </EditButton>

                <DeleteButton
                  onClick={() => handleDelete(domain.id)}
                >
                  Delete
                </DeleteButton>
              </ActionButtons>
            </DomainCard>
          ))
        ) : (
          <EmptyState>
            No domains found.
          </EmptyState>
        )}
      </DomainGrid>

      {/* Add / Edit Domain Modal */}
      {showModal && (
        <ModalOverlay>
          <Modal>
            <ModalTitle>
              {selectedDomain ? "Edit Domain" : "Add Domain"}
            </ModalTitle>

            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Domain Name</Label>

                <Input
                  type="text"
                  placeholder="Enter domain name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                />
              </FormGroup>

              <FormGroup>
                <Label>Description</Label>

                <TextArea
                  rows="4"
                  placeholder="Enter domain description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                />
              </FormGroup>

              <ModalActions>
                <CancelButton
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </CancelButton>

                <SaveButton type="submit">
                  {selectedDomain ? "Update Domain" : "Add Domain"}
                </SaveButton>
              </ModalActions>
            </form>
          </Modal>
        </ModalOverlay>
      )}

      {/* Employees Modal */}
      {showEmployees && selectedDomain && (
        <ModalOverlay>
          <Modal>
            <ModalTitle>
              {selectedDomain.name} - Employees
            </ModalTitle>

            {selectedDomain.employees.length > 0 ? (
              <EmployeeList>
                {selectedDomain.employees.map((employee) => (
                  <EmployeeItem key={employee.id}>
                    <EmployeeInfo>
                      <EmployeeName>
                        {employee.name}
                      </EmployeeName>

                      <EmployeeRole>
                        {employee.role}
                      </EmployeeRole>
                    </EmployeeInfo>
                  </EmployeeItem>
                ))}
              </EmployeeList>
            ) : (
              <EmptyState>
                No employees assigned to this domain.
              </EmptyState>
            )}

            <ModalActions>
              <CancelButton
                type="button"
                onClick={() => setShowEmployees(false)}
              >
                Close
              </CancelButton>
            </ModalActions>
          </Modal>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default Domains
