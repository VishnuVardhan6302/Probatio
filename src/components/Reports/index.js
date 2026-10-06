
import React, { useMemo, useState } from "react";
import styled from "styled-components";

/* =====================================================
   MOCK DATA
   This data represents the data coming from your
   previous HirNest pages:
   - Employees
   - Domains
   - Probation
   - Documents
   - Salary
===================================================== */
import NavSection from "../NavSection";

const domains = [
  {
    id: 1,
    name: "Frontend",
  },
  {
    id: 2,
    name: "Backend",
  },
  {
    id: 3,
    name: "QA",
  },
  {
    id: 4,
    name: "UI/UX",
  },
];

const employees = [
  {
    id: "EMP001",
    name: "Rahul Kumar",
    email: "rahul@example.com",
    domainId: 1,
    joiningDate: "2026-06-01",
    probationPeriod: 6,
    probationEndDate: "2026-12-01",
    probationStatus: "Active",
    employmentStatus: "Active",
    salary: 45000,
    documents: 4,
  },

  {
    id: "EMP002",
    name: "Priya Sharma",
    email: "priya@example.com",
    domainId: 2,
    joiningDate: "2026-01-15",
    probationPeriod: 6,
    probationEndDate: "2026-07-15",
    probationStatus: "Completed",
    employmentStatus: "Active",
    salary: 55000,
    documents: 5,
  },

  {
    id: "EMP003",
    name: "Kiran Reddy",
    email: "kiran@example.com",
    domainId: 3,
    joiningDate: "2026-07-10",
    probationPeriod: 3,
    probationEndDate: "2026-10-10",
    probationStatus: "Active",
    employmentStatus: "Active",
    salary: 40000,
    documents: 3,
  },

  {
    id: "EMP004",
    name: "Anjali Rao",
    email: "anjali@example.com",
    domainId: 4,
    joiningDate: "2026-02-20",
    probationPeriod: 6,
    probationEndDate: "2026-08-20",
    probationStatus: "Completed",
    employmentStatus: "Active",
    salary: 50000,
    documents: 6,
  },

  {
    id: "EMP005",
    name: "Vikram Singh",
    email: "vikram@example.com",
    domainId: 1,
    joiningDate: "2026-08-01",
    probationPeriod: 6,
    probationEndDate: "2027-02-01",
    probationStatus: "Active",
    employmentStatus: "Active",
    salary: 48000,
    documents: 2,
  },

  {
    id: "EMP006",
    name: "Sneha Reddy",
    email: "sneha@example.com",
    domainId: 2,
    joiningDate: "2026-03-10",
    probationPeriod: 6,
    probationEndDate: "2026-09-10",
    probationStatus: "Extended",
    employmentStatus: "Active",
    salary: 52000,
    documents: 4,
  },
];


/* =====================================================
   REPORTS COMPONENT
===================================================== */

const Reports = () => {

  /* ===================================================
     STATES
  =================================================== */

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedDomain, setSelectedDomain] =
    useState("all");

  const [selectedStatus, setSelectedStatus] =
    useState("all");


  /* ===================================================
     GET DOMAIN NAME
  =================================================== */

  const getDomainName = (domainId) => {

    const domain = domains.find(
      (item) => item.id === domainId
    );

    return domain ? domain.name : "Unknown";
  };


  /* ===================================================
     FILTER EMPLOYEES
  =================================================== */

  const filteredEmployees = useMemo(() => {

    return employees.filter((employee) => {

      const matchesSearch =
        employee.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||

        employee.id
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||

        employee.email
          .toLowerCase()
          .includes(searchTerm.toLowerCase());


      const matchesDomain =
        selectedDomain === "all" ||
        employee.domainId === Number(selectedDomain);


      const matchesStatus =
        selectedStatus === "all" ||
        employee.probationStatus === selectedStatus;


      return (
        matchesSearch &&
        matchesDomain &&
        matchesStatus
      );
    });

  }, [
    searchTerm,
    selectedDomain,
    selectedStatus,
  ]);


  /* ===================================================
     SUMMARY CALCULATIONS
  =================================================== */

  const totalEmployees =
    employees.length;


  const activeProbation =
    employees.filter(
      (employee) =>
        employee.probationStatus === "Active"
    ).length;


  const completedProbation =
    employees.filter(
      (employee) =>
        employee.probationStatus === "Completed"
    ).length;


  const extendedProbation =
    employees.filter(
      (employee) =>
        employee.probationStatus === "Extended"
    ).length;


  const totalSalary =
    employees.reduce(
      (total, employee) =>
        total + employee.salary,
      0
    );


  const totalDocuments =
    employees.reduce(
      (total, employee) =>
        total + employee.documents,
      0
    );


  /* ===================================================
     DOMAIN REPORT
  =================================================== */

  const domainReports = domains.map((domain) => {

    const domainEmployees =
      employees.filter(
        (employee) =>
          employee.domainId === domain.id
      );


    const active =
      domainEmployees.filter(
        (employee) =>
          employee.probationStatus === "Active"
      ).length;


    const completed =
      domainEmployees.filter(
        (employee) =>
          employee.probationStatus === "Completed"
      ).length;


    const extended =
      domainEmployees.filter(
        (employee) =>
          employee.probationStatus === "Extended"
      ).length;


    return {
      ...domain,
      total: domainEmployees.length,
      active,
      completed,
      extended,
    };

  });


  /* ===================================================
     STATUS CLASS
  =================================================== */

  const getStatusClass = (status) => {

    if (status === "Completed") {
      return "completed";
    }

    if (status === "Extended") {
      return "extended";
    }

    return "active";
  };


  /* ===================================================
     EXPORT CSV
  =================================================== */

  const handleExport = () => {

    const headers = [
      "Employee ID",
      "Employee Name",
      "Email",
      "Domain",
      "Joining Date",
      "Probation Period",
      "Probation End Date",
      "Probation Status",
      "Salary",
      "Documents",
    ];


    const rows =
      filteredEmployees.map((employee) => [

        employee.id,

        employee.name,

        employee.email,

        getDomainName(
          employee.domainId
        ),

        employee.joiningDate,

        `${employee.probationPeriod} Months`,

        employee.probationEndDate,

        employee.probationStatus,

        employee.salary,

        employee.documents,

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
      "hirnest-report.csv";

    link.click();


    URL.revokeObjectURL(url);
  };


  /* ===================================================
     RESET FILTERS
  =================================================== */

  const resetFilters = () => {

    setSearchTerm("");

    setSelectedDomain("all");

    setSelectedStatus("all");
  };


  /* ===================================================
     JSX
  =================================================== */

  return (

    <Page>

      {/* =================================================
          HEADER
      ================================================= */}
      <NavSection/>

      <Header>

        <HeaderLeft>

          <PageTitle>
            Reports
          </PageTitle>

          <PageDescription>
            View employee, probation, domain,
            salary and document reports.
          </PageDescription>

        </HeaderLeft>


        <ExportButton
          onClick={handleExport}
        >
          ↓ Export Report
        </ExportButton>

      </Header>


      {/* =================================================
          SUMMARY CARDS
      ================================================= */}

      <SummaryGrid>

        <SummaryCard>

          <IconBox>
            👥
          </IconBox>

          <CardContent>

            <CardLabel>
              Total Employees
            </CardLabel>

            <CardValue>
              {totalEmployees}
            </CardValue>

          </CardContent>

        </SummaryCard>


        <SummaryCard>

          <IconBox>
            ⏳
          </IconBox>

          <CardContent>

            <CardLabel>
              Active Probation
            </CardLabel>

            <CardValue>
              {activeProbation}
            </CardValue>

          </CardContent>

        </SummaryCard>


        <SummaryCard>

          <IconBox>
            ✓
          </IconBox>

          <CardContent>

            <CardLabel>
              Completed
            </CardLabel>

            <CardValue>
              {completedProbation}
            </CardValue>

          </CardContent>

        </SummaryCard>


        <SummaryCard>

          <IconBox>
            🔄
          </IconBox>

          <CardContent>

            <CardLabel>
              Extended
            </CardLabel>

            <CardValue>
              {extendedProbation}
            </CardValue>

          </CardContent>

        </SummaryCard>


        <SummaryCard>

          <IconBox>
            ₹
          </IconBox>

          <CardContent>

            <CardLabel>
              Monthly Salary
            </CardLabel>

            <CardValue>
              ₹{totalSalary.toLocaleString()}
            </CardValue>

          </CardContent>

        </SummaryCard>


        <SummaryCard>

          <IconBox>
            📄
          </IconBox>

          <CardContent>

            <CardLabel>
              Documents
            </CardLabel>

            <CardValue>
              {totalDocuments}
            </CardValue>

          </CardContent>

        </SummaryCard>

      </SummaryGrid>


      {/* =================================================
          FILTERS
      ================================================= */}

      <FilterCard>

        <FilterTitle>
          Report Filters
        </FilterTitle>


        <FilterGrid>

          {/* SEARCH */}

          <FilterItem>

            <Label>
              Search Employee
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


          {/* DOMAIN */}

          <FilterItem>

            <Label>
              Domain
            </Label>

            <Select
              value={selectedDomain}
              onChange={(event) =>
                setSelectedDomain(
                  event.target.value
                )
              }
            >

              <option value="all">
                All Domains
              </option>

              {domains.map((domain) => (

                <option
                  key={domain.id}
                  value={domain.id}
                >
                  {domain.name}
                </option>

              ))}

            </Select>

          </FilterItem>


          {/* STATUS */}

          <FilterItem>

            <Label>
              Probation Status
            </Label>

            <Select
              value={selectedStatus}
              onChange={(event) =>
                setSelectedStatus(
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

              <option value="Completed">
                Completed
              </option>

              <option value="Extended">
                Extended
              </option>

            </Select>

          </FilterItem>


          {/* RESET */}

          <ResetButton
            onClick={resetFilters}
          >
            Reset Filters
          </ResetButton>

        </FilterGrid>

      </FilterCard>


      {/* =================================================
          EMPLOYEE REPORT
      ================================================= */}

      <SectionCard>

        <SectionHeader>

          <SectionTitle>
            Employee Report
          </SectionTitle>

          <RecordCount>
            {filteredEmployees.length} Employees
          </RecordCount>

        </SectionHeader>


        <TableContainer>

          <Table>

            <thead>

              <tr>

                <TableHeading>
                  Employee
                </TableHeading>

                <TableHeading>
                  Domain
                </TableHeading>

                <TableHeading>
                  Joining Date
                </TableHeading>

                <TableHeading>
                  Probation
                </TableHeading>

                <TableHeading>
                  End Date
                </TableHeading>

                <TableHeading>
                  Salary
                </TableHeading>

                <TableHeading>
                  Documents
                </TableHeading>

                <TableHeading>
                  Status
                </TableHeading>

              </tr>

            </thead>


            <tbody>

              {filteredEmployees.length === 0 ? (

                <tr>

                  <TableData
                    colSpan="8"
                  >

                    <EmptyState>

                      No employees found.

                    </EmptyState>

                  </TableData>

                </tr>

              ) : (

                filteredEmployees.map(
                  (employee) => (

                    <tr key={employee.id}>

                      <TableData>

                        <EmployeeName>
                          {employee.name}
                        </EmployeeName>

                        <EmployeeId>
                          {employee.id}
                        </EmployeeId>

                      </TableData>


                      <TableData>
                        {getDomainName(
                          employee.domainId
                        )}
                      </TableData>


                      <TableData>
                        {employee.joiningDate}
                      </TableData>


                      <TableData>
                        {employee.probationPeriod}
                        {" "}
                        Months
                      </TableData>


                      <TableData>
                        {employee.probationEndDate}
                      </TableData>


                      <TableData>
                        ₹
                        {employee.salary.toLocaleString()}
                      </TableData>


                      <TableData>
                        {employee.documents}
                      </TableData>


                      <TableData>

                        <Status
                          className={
                            getStatusClass(
                              employee.probationStatus
                            )
                          }
                        >
                          {employee.probationStatus}
                        </Status>

                      </TableData>

                    </tr>

                  )
                )

              )}

            </tbody>

          </Table>

        </TableContainer>

      </SectionCard>


      {/* =================================================
          DOMAIN-WISE REPORT
      ================================================= */}

      <SectionCard>

        <SectionHeader>

          <SectionTitle>
            Domain-wise Probation Report
          </SectionTitle>

        </SectionHeader>


        <DomainGrid>

          {domainReports.map(
            (domain) => (

              <DomainCard
                key={domain.id}
              >

                <DomainTitle>
                  {domain.name}
                </DomainTitle>


                <DomainStats>

                  <DomainStat>

                    <StatLabel>
                      Total
                    </StatLabel>

                    <StatValue>
                      {domain.total}
                    </StatValue>

                  </DomainStat>


                  <DomainStat>

                    <StatLabel>
                      Active
                    </StatLabel>

                    <StatValue>
                      {domain.active}
                    </StatValue>

                  </DomainStat>


                  <DomainStat>

                    <StatLabel>
                      Completed
                    </StatLabel>

                    <StatValue>
                      {domain.completed}
                    </StatValue>

                  </DomainStat>


                  <DomainStat>

                    <StatLabel>
                      Extended
                    </StatLabel>

                    <StatValue>
                      {domain.extended}
                    </StatValue>

                  </DomainStat>

                </DomainStats>

              </DomainCard>

            )
          )}

        </DomainGrid>

      </SectionCard>

    </Page>
  );
};


export default Reports

const Page = styled.div`
  min-height: 100vh;
  padding: 24px;
  background: #f8fafc;
  box-sizing: border-box;
  margin-left:250px;
`;


/* =====================================================
   HEADER
===================================================== */

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;


const HeaderLeft = styled.div``;


const PageTitle = styled.h1`
  margin: 0;
  color: #0f172a;
  font-size: 28px;
  font-weight: 700;
`;


const PageDescription = styled.p`
  margin: 6px 0 0;
  color: #64748b;
  font-size: 14px;
`;


const ExportButton = styled.button`
  border: none;
  border-radius: 8px;

  padding: 11px 18px;

  background: #2563eb;
  color: white;

  font-size: 14px;
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
    repeat(6, 1fr);

  gap: 16px;

  margin-bottom: 24px;

  @media (max-width: 1200px) {
    grid-template-columns:
      repeat(3, 1fr);
  }

  @media (max-width: 700px) {
    grid-template-columns:
      repeat(2, 1fr);
  }

  @media (max-width: 450px) {
    grid-template-columns:
      1fr;
  }
`;


const SummaryCard = styled.div`
  background: white;

  border: 1px solid #e2e8f0;

  border-radius: 12px;

  padding: 18px;

  display: flex;

  align-items: center;

  gap: 12px;

  box-shadow:
    0 1px 3px rgba(15, 23, 42, 0.05);
`;


const IconBox = styled.div`
  width: 42px;
  height: 42px;

  flex-shrink: 0;

  border-radius: 10px;

  display: flex;

  align-items: center;

  justify-content: center;

  background: #eff6ff;

  color: #2563eb;

  font-size: 19px;

  font-weight: 700;
`;


const CardContent = styled.div`
  min-width: 0;
`;


const CardLabel = styled.div`
  color: #64748b;

  font-size: 12px;

  margin-bottom: 5px;

  white-space: nowrap;
`;


const CardValue = styled.div`
  color: #0f172a;

  font-size: 21px;

  font-weight: 700;
`;


/* =====================================================
   FILTERS
===================================================== */

const FilterCard = styled.div`
  background: white;

  border: 1px solid #e2e8f0;

  border-radius: 12px;

  padding: 20px;

  margin-bottom: 24px;
`;


const FilterTitle = styled.h2`
  margin: 0 0 16px;

  color: #0f172a;

  font-size: 17px;

  font-weight: 700;
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
  box-sizing: border-box;

  width: 100%;

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
  box-sizing: border-box;

  width: 100%;

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
  padding: 10px 15px;

  border: 1px solid #cbd5e1;

  border-radius: 7px;

  background: white;

  color: #475569;

  font-size: 13px;

  font-weight: 600;

  cursor: pointer;

  white-space: nowrap;

  &:hover {
    background: #f8fafc;
  }
`;


/* =====================================================
   TABLE SECTION
===================================================== */

const SectionCard = styled.div`
  background: white;

  border: 1px solid #e2e8f0;

  border-radius: 12px;

  margin-bottom: 24px;

  overflow: hidden;
`;


const SectionHeader = styled.div`
  display: flex;

  justify-content: space-between;

  align-items: center;

  padding: 18px 20px;

  border-bottom: 1px solid #e2e8f0;
`;


const SectionTitle = styled.h2`
  margin: 0;

  color: #0f172a;

  font-size: 17px;

  font-weight: 700;
`;


const RecordCount = styled.span`
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


const TableHeading = styled.th`
  padding: 13px 16px;

  background: #f8fafc;

  color: #475569;

  text-align: left;

  font-size: 12px;

  font-weight: 700;

  white-space: nowrap;
`;


const TableData = styled.td`
  padding: 14px 16px;

  border-top: 1px solid #f1f5f9;

  color: #475569;

  font-size: 13px;

  white-space: nowrap;
`;


const EmployeeName = styled.div`
  color: #0f172a;

  font-weight: 600;

  margin-bottom: 3px;
`;


const EmployeeId = styled.div`
  color: #94a3b8;

  font-size: 11px;
`;


/* =====================================================
   STATUS
===================================================== */

const Status = styled.span`
  display: inline-flex;

  padding: 5px 10px;

  border-radius: 20px;

  font-size: 11px;

  font-weight: 600;

  &.active {
    background: #dbeafe;

    color: #1d4ed8;
  }

  &.completed {
    background: #dcfce7;

    color: #166534;
  }

  &.extended {
    background: #fef3c7;

    color: #92400e;
  }
`;


const EmptyState = styled.div`
  padding: 40px;

  text-align: center;

  color: #94a3b8;
`;


/* =====================================================
   DOMAIN REPORT
===================================================== */

const DomainGrid = styled.div`
  display: grid;

  grid-template-columns:
    repeat(2, 1fr);

  gap: 16px;

  padding: 20px;

  @media (max-width: 700px) {
    grid-template-columns:
      1fr;
  }
`;


const DomainCard = styled.div`
  padding: 18px;

  border: 1px solid #e2e8f0;

  border-radius: 10px;
`;


const DomainTitle = styled.h3`
  margin: 0 0 16px;

  color: #0f172a;

  font-size: 16px;
`;


const DomainStats = styled.div`
  display: grid;

  grid-template-columns:
    repeat(4, 1fr);

  gap: 10px;
`;


const DomainStat = styled.div`
  padding: 10px;

  background: #f8fafc;

  border-radius: 8px;

  text-align: center;
`;


const StatLabel = styled.div`
  margin-bottom: 4px;

  color: #64748b;

  font-size: 11px;
`;


const StatValue = styled.div`
  color: #0f172a;

  font-size: 18px;

  font-weight: 700;
`;

