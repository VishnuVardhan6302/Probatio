import React, { useMemo, useState } from "react";
import {
  Page,
  PageHeader,
  Title,
  Description,
  MainLayout,
  DomainPanel,
  DomainHeader,
  DomainTitle,
  DomainList,
  DomainItem,
  DomainName,
  DomainCount,
  ContentPanel,
  ContentHeader,
  SelectedDomain,
  SelectedDomainCount,
  SearchInput,
  SummaryGrid,
  SummaryCard,
  SummaryLabel,
  SummaryValue,
  TableWrapper,
  Table,
  Th,
  Td,
  EmployeeName,
  EmployeeId,
  StatusBadge,
  EmptyMessage,
} from "./styledComponents";


import NavSection from "../NavSection";
// ==============================
// MOCK DATA
// ==============================

const domains = [
  {
    id: 1,
    name: "Frontend Development",
  },
  {
    id: 2,
    name: "Backend Development",
  },
  {
    id: 3,
    name: "UI/UX Design",
  },
  {
    id: 4,
    name: "QA Testing",
  },
  {
    id: 5,
    name: "DevOps",
  },
];

const probationData = [
  {
    id: "EMP001",
    name: "Rahul Sharma",
    email: "rahul@company.com",
    domainId: 1,
    domain: "Frontend Development",
    joiningDate: "01 Jun 2026",
    probationEndDate: "30 Nov 2026",
    status: "In Progress",
  },
  {
    id: "EMP002",
    name: "Priya Reddy",
    email: "priya@company.com",
    domainId: 1,
    domain: "Frontend Development",
    joiningDate: "15 Mar 2026",
    probationEndDate: "15 Sep 2026",
    status: "Completed",
  },
  {
    id: "EMP003",
    name: "Vamsi Krishna",
    email: "vamsi@company.com",
    domainId: 1,
    domain: "Frontend Development",
    joiningDate: "10 May 2026",
    probationEndDate: "10 Nov 2026",
    status: "Under Review",
  },

  {
    id: "EMP004",
    name: "Kiran Kumar",
    email: "kiran@company.com",
    domainId: 2,
    domain: "Backend Development",
    joiningDate: "01 Apr 2026",
    probationEndDate: "01 Oct 2026",
    status: "In Progress",
  },
  {
    id: "EMP005",
    name: "Arjun Reddy",
    email: "arjun@company.com",
    domainId: 2,
    domain: "Backend Development",
    joiningDate: "01 Jul 2026",
    probationEndDate: "31 Dec 2026",
    status: "Under Review",
  },

  {
    id: "EMP006",
    name: "Sneha Patel",
    email: "sneha@company.com",
    domainId: 3,
    domain: "UI/UX Design",
    joiningDate: "01 Jan 2026",
    probationEndDate: "01 Jul 2026",
    status: "Completed",
  },
  {
    id: "EMP007",
    name: "Ananya Rao",
    email: "ananya@company.com",
    domainId: 3,
    domain: "UI/UX Design",
    joiningDate: "01 Apr 2026",
    probationEndDate: "01 Oct 2026",
    status: "In Progress",
  },

  {
    id: "EMP008",
    name: "Divya Sharma",
    email: "divya@company.com",
    domainId: 4,
    domain: "QA Testing",
    joiningDate: "01 Feb 2026",
    probationEndDate: "01 Aug 2026",
    status: "Extended",
  },
  {
    id: "EMP009",
    name: "Pavan Kumar",
    email: "pavan@company.com",
    domainId: 4,
    domain: "QA Testing",
    joiningDate: "15 Jun 2026",
    probationEndDate: "15 Dec 2026",
    status: "In Progress",
  },

  {
    id: "EMP010",
    name: "Suresh Kumar",
    email: "suresh@company.com",
    domainId: 5,
    domain: "DevOps",
    joiningDate: "01 May 2026",
    probationEndDate: "01 Nov 2026",
    status: "In Progress",
  },
];


// ==============================
// COMPONENT
// ==============================

const DomainWiseProbation = () => {

  const [selectedDomain, setSelectedDomain] = useState(1);

  const [search, setSearch] = useState("");


  // ==============================
  // SELECTED DOMAIN
  // ==============================

  const currentDomain = domains.find(
    (domain) => domain.id === selectedDomain
  );


  // ==============================
  // EMPLOYEES OF SELECTED DOMAIN
  // ==============================

  const domainEmployees = useMemo(() => {

    return probationData.filter(
      (employee) =>
        employee.domainId === selectedDomain
    );

  }, [selectedDomain]);


  // ==============================
  // SEARCH
  // ==============================

  const filteredEmployees = useMemo(() => {

    const searchValue = search
      .toLowerCase()
      .trim();

    if (!searchValue) {
      return domainEmployees;
    }

    return domainEmployees.filter(
      (employee) =>
        employee.name
          .toLowerCase()
          .includes(searchValue) ||

        employee.id
          .toLowerCase()
          .includes(searchValue) ||

        employee.email
          .toLowerCase()
          .includes(searchValue)
    );

  }, [domainEmployees, search]);


  // ==============================
  // DOMAIN EMPLOYEE COUNT
  // ==============================

  const getDomainCount = (domainId) => {

    return probationData.filter(
      (employee) =>
        employee.domainId === domainId
    ).length;

  };


  // ==============================
  // STATUS COUNTS
  // ==============================

  const completedCount =
    domainEmployees.filter(
      (employee) =>
        employee.status === "Completed"
    ).length;


  const inProgressCount =
    domainEmployees.filter(
      (employee) =>
        employee.status === "In Progress"
    ).length;


  const reviewCount =
    domainEmployees.filter(
      (employee) =>
        employee.status === "Under Review"
    ).length;


  // ==============================
  // RENDER
  // ==============================

  return (

    <Page>
      <NavSection/>

      {/* PAGE HEADER */}

      <PageHeader>

        <div>

          <Title>
            Domain-wise Probation
          </Title>

          <Description>
            View employee probation details
            based on their domain.
          </Description>

        </div>

      </PageHeader>


      <MainLayout>


        {/* ==================================
            DOMAIN LIST
        ================================== */}

        <DomainPanel>

          <DomainHeader>

            <DomainTitle>
              Domains
            </DomainTitle>

            <span>
              {domains.length}
            </span>

          </DomainHeader>


          <DomainList>

            {domains.map((domain) => {

              const count =
                getDomainCount(domain.id);

              const active =
                selectedDomain === domain.id;


              return (

                <DomainItem
                  key={domain.id}
                  $active={active}
                  onClick={() => {

                    setSelectedDomain(domain.id);

                    setSearch("");

                  }}
                >

                  <div>

                    <DomainName>
                      {domain.name}
                    </DomainName>

                    <DomainCount>
                      {count} Employees
                    </DomainCount>

                  </div>

                  <span>
                    →
                  </span>

                </DomainItem>

              );

            })}

          </DomainList>

        </DomainPanel>


        {/* ==================================
            EMPLOYEE SECTION
        ================================== */}

        <ContentPanel>


          <ContentHeader>

            <div>

              <SelectedDomain>
                {currentDomain?.name}
              </SelectedDomain>

              <SelectedDomainCount>
                {domainEmployees.length}
                {" "}
                employees
              </SelectedDomainCount>

            </div>


            <SearchInput
              type="text"
              placeholder="Search employee..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </ContentHeader>


          {/* SUMMARY */}

          <SummaryGrid>

            <SummaryCard>

              <SummaryLabel>
                Total
              </SummaryLabel>

              <SummaryValue>
                {domainEmployees.length}
              </SummaryValue>

            </SummaryCard>


            <SummaryCard>

              <SummaryLabel>
                In Progress
              </SummaryLabel>

              <SummaryValue>
                {inProgressCount}
              </SummaryValue>

            </SummaryCard>


            <SummaryCard>

              <SummaryLabel>
                Under Review
              </SummaryLabel>

              <SummaryValue>
                {reviewCount}
              </SummaryValue>

            </SummaryCard>


            <SummaryCard>

              <SummaryLabel>
                Completed
              </SummaryLabel>

              <SummaryValue>
                {completedCount}
              </SummaryValue>

            </SummaryCard>

          </SummaryGrid>


          {/* TABLE */}

          <TableWrapper>

            {filteredEmployees.length > 0 ? (

              <Table>

                <thead>

                  <tr>

                    <Th>
                      Employee
                    </Th>

                    <Th>
                      Joining Date
                    </Th>

                    <Th>
                      Probation End Date
                    </Th>

                    <Th>
                      Status
                    </Th>

                  </tr>

                </thead>


                <tbody>

                  {filteredEmployees.map(
                    (employee) => (

                      <tr
                        key={employee.id}
                      >

                        <Td>

                          <EmployeeName>
                            {employee.name}
                          </EmployeeName>

                          <EmployeeId>
                            {employee.id}
                            {" • "}
                            {employee.email}
                          </EmployeeId>

                        </Td>


                        <Td>
                          {employee.joiningDate}
                        </Td>


                        <Td>
                          {employee.probationEndDate}
                        </Td>


                        <Td>

                          <StatusBadge
                            $status={
                              employee.status
                            }
                          >
                            {employee.status}
                          </StatusBadge>

                        </Td>

                      </tr>

                    )
                  )}

                </tbody>

              </Table>

            ) : (

              <EmptyMessage>
                No employees found.
              </EmptyMessage>

            )}

          </TableWrapper>

        </ContentPanel>

      </MainLayout>

    </Page>
  );
};


export default DomainWiseProbation;