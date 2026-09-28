import React, { useState } from "react";
import styled from "styled-components";

/* =========================================================
   MOCK DATA
========================================================= */

const initialEmployee = {
  id: "EMP001",
  name: "Rahul Sharma",
  designation: "Frontend Developer",
  domain: "Development",
  department: "Technology",
  email: "rahul.sharma@hirenest.com",
  phone: "+91 98765 43210",
  joiningDate: "15 Apr 2025",
  probationStartDate: "15 Apr 2025",
  probationEndDate: "14 Oct 2025",
  daysLeft: 12,
  probationPeriod: "6 Months",
  status: "In Progress",
  manager: "Arun Kumar",
  managerDesignation: "Engineering Manager",
  location: "Bengaluru",
  employeeType: "Full Time",
  workMode: "Hybrid",
  performance: 82,
  attendance: 94,
  goalsCompleted: 8,
  totalGoals: 10,
  profileImage: "https://i.pravatar.cc/150?img=12",
};

/* =========================================================
   MOCK ACTIVITY
========================================================= */

const initialActivities = [
  {
    id: 1,
    title: "Probation started",
    description:
      "Employee probation period started from 15 April 2025.",
    date: "15 Apr 2025",
    icon: "🚀",
  },
  {
    id: 2,
    title: "First month review completed",
    description:
      "Manager completed the first month probation review.",
    date: "15 May 2025",
    icon: "✓",
  },
  {
    id: 3,
    title: "Mid probation review",
    description:
      "Performance review completed with positive feedback.",
    date: "15 Jul 2025",
    icon: "⭐",
  },
  {
    id: 4,
    title: "Performance feedback updated",
    description:
      "Latest performance score updated by the reporting manager.",
    date: "25 Sep 2025",
    icon: "📝",
  },
];

/* =========================================================
   MOCK DOCUMENTS
========================================================= */

const documents = [
  {
    id: 1,
    name: "Offer Letter",
    type: "PDF",
    date: "15 Apr 2025",
    size: "1.2 MB",
  },
  {
    id: 2,
    name: "Joining Documents",
    type: "PDF",
    date: "15 Apr 2025",
    size: "2.4 MB",
  },
  {
    id: 3,
    name: "Probation Review",
    type: "PDF",
    date: "15 Jul 2025",
    size: "850 KB",
  },
];

/* =========================================================
   APP
========================================================= */

const ProbationDetails=()=> {
  const [employee, setEmployee] = useState(initialEmployee);
  const [activities, setActivities] = useState(initialActivities);

  const [activeTab, setActiveTab] = useState("Overview");

  const [showExtendModal, setShowExtendModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const [extensionDays, setExtensionDays] = useState("30");
  const [extensionReason, setExtensionReason] = useState("");

  const [notification, setNotification] = useState("");

  /* =======================================================
     EXTEND PROBATION
  ======================================================= */

  const handleExtendProbation = () => {
    if (!extensionReason.trim()) {
      alert("Please enter extension reason.");
      return;
    }

    const newActivity = {
      id: Date.now(),
      title: "Probation extended",
      description: `Probation extended by ${extensionDays} days. Reason: ${extensionReason}`,
      date: "25 Sep 2025",
      icon: "↗",
    };

    setActivities((prev) => [newActivity, ...prev]);

    setEmployee((prev) => ({
      ...prev,
      status: "Extended",
      daysLeft: parseInt(extensionDays),
    }));

    setShowExtendModal(false);
    setExtensionReason("");

    setNotification(
      `Probation successfully extended by ${extensionDays} days.`
    );

    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  /* =======================================================
     COMPLETE PROBATION
  ======================================================= */

  const handleCompleteProbation = () => {
    const newActivity = {
      id: Date.now(),
      title: "Probation completed",
      description:
        "Employee probation has been successfully completed.",
      date: "25 Sep 2025",
      icon: "✓",
    };

    setActivities((prev) => [newActivity, ...prev]);

    setEmployee((prev) => ({
      ...prev,
      status: "Completed",
      daysLeft: "-",
      performance: 86,
    }));

    setShowCompleteModal(false);

    setNotification("Probation successfully completed.");

    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  /* =======================================================
     STATUS COLOR
  ======================================================= */

  const getStatusClass = () => {
    if (employee.status === "Completed") return "completed";
    if (employee.status === "Due Soon") return "dueSoon";
    if (employee.status === "Extended") return "extended";

    return "progress";
  };

  return (
    <Page>

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <Sidebar>

        <LogoSection>
          <LogoIcon>🐦</LogoIcon>
          <LogoText>HireNest</LogoText>
          <MenuIcon>☰</MenuIcon>
        </LogoSection>

        <Navigation>

          <NavItem>
            <NavIcon>⌂</NavIcon>
            <span>Dashboard</span>
          </NavItem>

          <NavItem>
            <NavIcon>♙</NavIcon>
            <span>Employees</span>
          </NavItem>

          <NavItem>
            <NavIcon>▣</NavIcon>
            <span>Domains</span>
          </NavItem>

          <NavItem active>
            <NavIcon>◷</NavIcon>
            <span>Probation</span>
            <NavArrow>⌄</NavArrow>
          </NavItem>

          <SubNavigation>
            <SubNavItem>
              • Probation Dashboard
            </SubNavItem>

            <SubNavItem>
              • In Progress
            </SubNavItem>

            <SubNavItem active>
              • Probation Details
            </SubNavItem>

            <SubNavItem>
              • Completed
            </SubNavItem>

            <SubNavItem>
              • Due Soon
            </SubNavItem>

            <SubNavItem>
              • Extended
            </SubNavItem>
          </SubNavigation>

          <NavItem>
            <NavIcon>▤</NavIcon>
            <span>Documents</span>
          </NavItem>

          <NavItem>
            <NavIcon>▤</NavIcon>
            <span>Reports</span>
          </NavItem>

          <NavItem>
            <NavIcon>♙</NavIcon>
            <span>Users</span>
          </NavItem>

          <NavItem>
            <NavIcon>♙</NavIcon>
            <span>Profile</span>
          </NavItem>

          <NavItem>
            <NavIcon>⚙</NavIcon>
            <span>Settings</span>
          </NavItem>

        </Navigation>
      </Sidebar>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <Main>

        {/* ===================================================
            HEADER
        =================================================== */}

        <Header>

          <SearchBox>
            <span>⌕</span>

            <input
              placeholder="Search employees, domains, etc..."
            />
          </SearchBox>

          <HeaderRight>

            <Notification>
              ♧
              <NotificationCount>3</NotificationCount>
            </Notification>

            <UserSection>

              <UserImage
                src="https://i.pravatar.cc/100?img=12"
                alt="Admin"
              />

              <div>
                <strong>Vishnu Vardhan</strong>
                <small>Admin</small>
              </div>

              <span>⌄</span>

            </UserSection>

          </HeaderRight>

        </Header>

        {/* ===================================================
            CONTENT
        =================================================== */}

        <Content>

          {/* BREADCRUMB */}

          <Breadcrumb>

            <span>Probation</span>

            <b>›</b>

            <span>Probation Details</span>

            <b>›</b>

            <strong>{employee.name}</strong>

          </Breadcrumb>

          {/* =================================================
              EMPLOYEE HEADER
          ================================================= */}

          <EmployeeHeader>

            <EmployeeMain>

              <BackButton>
                ←
              </BackButton>

              <ProfileImage
                src={employee.profileImage}
                alt={employee.name}
              />

              <EmployeeBasic>

                <EmployeeNameRow>

                  <h1>{employee.name}</h1>

                  <StatusBadge
                    className={getStatusClass()}
                  >
                    {employee.status}
                  </StatusBadge>

                </EmployeeNameRow>

                <EmployeeDesignation>
                  {employee.designation} • {employee.domain}
                </EmployeeDesignation>

                <EmployeeId>
                  Employee ID: <strong>{employee.id}</strong>
                </EmployeeId>

              </EmployeeBasic>

            </EmployeeMain>

            <HeaderActions>

              <SecondaryButton>
                ✉ Contact
              </SecondaryButton>

              <SecondaryButton>
                ⋮
              </SecondaryButton>

            </HeaderActions>

          </EmployeeHeader>

          {/* =================================================
              PROBATION SUMMARY
          ================================================= */}

          <SummaryCard>

            <SummaryTop>

              <SummaryTitle>
                <span>◷</span>

                <div>
                  <h2>Probation Period</h2>

                  <p>
                    Track employee probation progress and
                    completion status.
                  </p>
                </div>
              </SummaryTitle>

              <StatusBadge
                className={getStatusClass()}
              >
                {employee.status}
              </StatusBadge>

            </SummaryTop>

            <SummaryGrid>

              <SummaryItem>
                <SummaryIcon>📅</SummaryIcon>

                <div>
                  <label>Joining Date</label>
                  <strong>{employee.joiningDate}</strong>
                </div>
              </SummaryItem>

              <SummaryItem>
                <SummaryIcon>🚀</SummaryIcon>

                <div>
                  <label>Probation Start</label>
                  <strong>
                    {employee.probationStartDate}
                  </strong>
                </div>
              </SummaryItem>

              <SummaryItem>
                <SummaryIcon>🏁</SummaryIcon>

                <div>
                  <label>Probation End</label>
                  <strong>
                    {employee.probationEndDate}
                  </strong>
                </div>
              </SummaryItem>

              <SummaryItem>
                <SummaryIcon>⏳</SummaryIcon>

                <div>
                  <label>Days Remaining</label>

                  <strong>
                    {employee.daysLeft === "-"
                      ? "-"
                      : `${employee.daysLeft} Days`}
                  </strong>
                </div>
              </SummaryItem>

              <SummaryItem>
                <SummaryIcon>◷</SummaryIcon>

                <div>
                  <label>Probation Period</label>
                  <strong>{employee.probationPeriod}</strong>
                </div>
              </SummaryItem>

            </SummaryGrid>

            {/* PROGRESS */}

            <ProgressSection>

              <ProgressHeader>

                <span>Probation Progress</span>

                <strong>
                  {employee.status === "Completed"
                    ? "100%"
                    : "82%"}
                </strong>

              </ProgressHeader>

              <ProgressTrack>

                <ProgressValue
                  completed={
                    employee.status === "Completed"
                  }
                />

              </ProgressTrack>

              <ProgressFooter>

                <span>
                  {employee.probationStartDate}
                </span>

                <span>
                  {employee.status === "Completed"
                    ? "Completed"
                    : `${employee.daysLeft} days remaining`}
                </span>

                <span>
                  {employee.probationEndDate}
                </span>

              </ProgressFooter>

            </ProgressSection>

          </SummaryCard>

          {/* =================================================
              TABS
          ================================================= */}

          <Tabs>

            {[
              "Overview",
              "Employment",
              "Performance",
              "Documents",
              "Activity",
            ].map((tab) => (

              <Tab
                key={tab}
                active={activeTab === tab}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </Tab>

            ))}

          </Tabs>

          {/* =================================================
              OVERVIEW
          ================================================= */}

          {activeTab === "Overview" && (

            <Overview>

              {/* LEFT */}

              <LeftColumn>

                <SectionCard>

                  <SectionHeader>
                    <h3>Employee Information</h3>
                    <button>Edit</button>
                  </SectionHeader>

                  <InformationGrid>

                    <InformationItem>
                      <label>Full Name</label>
                      <strong>{employee.name}</strong>
                    </InformationItem>

                    <InformationItem>
                      <label>Employee ID</label>
                      <strong>{employee.id}</strong>
                    </InformationItem>

                    <InformationItem>
                      <label>Email Address</label>
                      <strong>{employee.email}</strong>
                    </InformationItem>

                    <InformationItem>
                      <label>Phone Number</label>
                      <strong>{employee.phone}</strong>
                    </InformationItem>

                    <InformationItem>
                      <label>Department</label>
                      <strong>{employee.department}</strong>
                    </InformationItem>

                    <InformationItem>
                      <label>Domain</label>
                      <strong>{employee.domain}</strong>
                    </InformationItem>

                    <InformationItem>
                      <label>Location</label>
                      <strong>{employee.location}</strong>
                    </InformationItem>

                    <InformationItem>
                      <label>Employment Type</label>
                      <strong>{employee.employeeType}</strong>
                    </InformationItem>

                  </InformationGrid>

                </SectionCard>

                {/* MANAGER */}

                <SectionCard>

                  <SectionHeader>
                    <h3>Reporting Manager</h3>
                  </SectionHeader>

                  <Manager>

                    <ManagerImage
                      src="https://i.pravatar.cc/100?img=13"
                      alt="Manager"
                    />

                    <ManagerDetails>
                      <strong>{employee.manager}</strong>

                      <span>
                        {employee.managerDesignation}
                      </span>

                      <small>
                        Technology Department
                      </small>
                    </ManagerDetails>

                    <SecondaryButton>
                      View Profile
                    </SecondaryButton>

                  </Manager>

                </SectionCard>

              </LeftColumn>

              {/* RIGHT */}

              <RightColumn>

                {/* PERFORMANCE */}

                <SectionCard>

                  <SectionHeader>
                    <h3>Probation Summary</h3>
                  </SectionHeader>

                  <Metric>

                    <MetricHeader>
                      <span>Overall Performance</span>
                      <strong>
                        {employee.performance}%
                      </strong>
                    </MetricHeader>

                    <MetricTrack>
                      <MetricProgress
                        width={employee.performance}
                      />
                    </MetricTrack>

                  </Metric>

                  <Metric>

                    <MetricHeader>
                      <span>Attendance</span>
                      <strong>
                        {employee.attendance}%
                      </strong>
                    </MetricHeader>

                    <MetricTrack>
                      <MetricProgress
                        width={employee.attendance}
                      />
                    </MetricTrack>

                  </Metric>

                  <Metric>

                    <MetricHeader>
                      <span>Goals Completed</span>

                      <strong>
                        {employee.goalsCompleted}/
                        {employee.totalGoals}
                      </strong>

                    </MetricHeader>

                    <MetricTrack>
                      <MetricProgress
                        width={
                          (employee.goalsCompleted /
                            employee.totalGoals) *
                          100
                        }
                      />
                    </MetricTrack>

                  </Metric>

                </SectionCard>

                {/* QUICK ACTIONS */}

                <SectionCard>

                  <SectionHeader>
                    <h3>Probation Actions</h3>
                  </SectionHeader>

                  <ActionList>

                    <ActionButton
                      onClick={() =>
                        setShowCompleteModal(true)
                      }
                      disabled={
                        employee.status === "Completed"
                      }
                    >
                      <ActionIcon green>
                        ✓
                      </ActionIcon>

                      <div>
                        <strong>
                          Complete Probation
                        </strong>

                        <span>
                          Confirm successful probation
                          completion
                        </span>
                      </div>

                      <span>›</span>
                    </ActionButton>

                    <ActionButton
                      onClick={() =>
                        setShowExtendModal(true)
                      }
                    >
                      <ActionIcon purple>
                        ↗
                      </ActionIcon>

                      <div>
                        <strong>
                          Extend Probation
                        </strong>

                        <span>
                          Extend probation period
                        </span>
                      </div>

                      <span>›</span>
                    </ActionButton>

                    <ActionButton>
                      <ActionIcon blue>
                        📝
                      </ActionIcon>

                      <div>
                        <strong>
                          Add Review
                        </strong>

                        <span>
                          Add probation feedback
                        </span>
                      </div>

                      <span>›</span>
                    </ActionButton>

                  </ActionList>

                </SectionCard>

              </RightColumn>

            </Overview>

          )}

          {/* =================================================
              EMPLOYMENT TAB
          ================================================= */}

          {activeTab === "Employment" && (

            <SectionCard>

              <SectionHeader>
                <h3>Employment Details</h3>
              </SectionHeader>

              <InformationGrid>

                <InformationItem>
                  <label>Designation</label>
                  <strong>{employee.designation}</strong>
                </InformationItem>

                <InformationItem>
                  <label>Department</label>
                  <strong>{employee.department}</strong>
                </InformationItem>

                <InformationItem>
                  <label>Domain</label>
                  <strong>{employee.domain}</strong>
                </InformationItem>

                <InformationItem>
                  <label>Employee Type</label>
                  <strong>{employee.employeeType}</strong>
                </InformationItem>

                <InformationItem>
                  <label>Work Mode</label>
                  <strong>{employee.workMode}</strong>
                </InformationItem>

                <InformationItem>
                  <label>Location</label>
                  <strong>{employee.location}</strong>
                </InformationItem>

                <InformationItem>
                  <label>Joining Date</label>
                  <strong>{employee.joiningDate}</strong>
                </InformationItem>

                <InformationItem>
                  <label>Reporting Manager</label>
                  <strong>{employee.manager}</strong>
                </InformationItem>

              </InformationGrid>

            </SectionCard>

          )}

          {/* =================================================
              PERFORMANCE TAB
          ================================================= */}

          {activeTab === "Performance" && (

            <PerformanceGrid>

              <PerformanceCard>

                <PerformanceCircle
                  value={employee.performance}
                >
                  <div>
                    <strong>
                      {employee.performance}%
                    </strong>

                    <span>
                      Overall
                    </span>
                  </div>
                </PerformanceCircle>

                <h3>Overall Performance</h3>

                <p>
                  Employee is performing well during the
                  probation period.
                </p>

              </PerformanceCard>

              <SectionCard>

                <SectionHeader>
                  <h3>Performance Metrics</h3>
                </SectionHeader>

                <Metric>

                  <MetricHeader>
                    <span>Technical Skills</span>
                    <strong>85%</strong>
                  </MetricHeader>

                  <MetricTrack>
                    <MetricProgress width={85} />
                  </MetricTrack>

                </Metric>

                <Metric>

                  <MetricHeader>
                    <span>Communication</span>
                    <strong>80%</strong>
                  </MetricHeader>

                  <MetricTrack>
                    <MetricProgress width={80} />
                  </MetricTrack>

                </Metric>

                <Metric>

                  <MetricHeader>
                    <span>Team Collaboration</span>
                    <strong>88%</strong>
                  </MetricHeader>

                  <MetricTrack>
                    <MetricProgress width={88} />
                  </MetricTrack>

                </Metric>

                <Metric>

                  <MetricHeader>
                    <span>Problem Solving</span>
                    <strong>82%</strong>
                  </MetricHeader>

                  <MetricTrack>
                    <MetricProgress width={82} />
                  </MetricTrack>

                </Metric>

              </SectionCard>

            </PerformanceGrid>

          )}

          {/* =================================================
              DOCUMENTS TAB
          ================================================= */}

          {activeTab === "Documents" && (

            <SectionCard>

              <SectionHeader>

                <h3>Probation Documents</h3>

                <PrimaryButton>
                  + Upload Document
                </PrimaryButton>

              </SectionHeader>

              <DocumentList>

                {documents.map((document) => (

                  <DocumentItem key={document.id}>

                    <DocumentIcon>
                      PDF
                    </DocumentIcon>

                    <DocumentInfo>

                      <strong>
                        {document.name}
                      </strong>

                      <span>
                        {document.date} •{" "}
                        {document.size}
                      </span>

                    </DocumentInfo>

                    <DocumentAction>
                      View
                    </DocumentAction>

                    <DocumentAction>
                      ↓
                    </DocumentAction>

                  </DocumentItem>

                ))}

              </DocumentList>

            </SectionCard>

          )}

          {/* =================================================
              ACTIVITY TAB
          ================================================= */}

          {activeTab === "Activity" && (

            <SectionCard>

              <SectionHeader>
                <h3>Probation Activity</h3>
              </SectionHeader>

              <Timeline>

                {activities.map((activity) => (

                  <TimelineItem key={activity.id}>

                    <TimelineIcon>
                      {activity.icon}
                    </TimelineIcon>
<TimelineContent>

  <TimelineTop>
    <strong>{activity.title}</strong>
    <span>{activity.date}</span>
  </TimelineTop>

  <p>{activity.description}</p>

</TimelineContent>

                  </TimelineItem>

                ))}

              </Timeline>

            </SectionCard>

          )}

          {/* =================================================
              FOOTER ACTIONS
          ================================================= */}

          <BottomActions>

            <SecondaryButton>
              ← Back to Probation
            </SecondaryButton>

            <div>

              <SecondaryButton>
                Print
              </SecondaryButton>

              <PrimaryButton>
                Download Report
              </PrimaryButton>

            </div>

          </BottomActions>

        </Content>

      </Main>

      {/* =====================================================
          EXTEND MODAL
      ===================================================== */}

      {showExtendModal && (

        <ModalOverlay>

          <Modal>

            <ModalHeader>

              <div>

                <h2>Extend Probation</h2>

                <p>
                  Extend probation period for{" "}
                  <strong>{employee.name}</strong>
                </p>

              </div>

              <CloseButton
                onClick={() =>
                  setShowExtendModal(false)
                }
              >
                ×
              </CloseButton>

            </ModalHeader>

            <ModalBody>

              <FormGroup>

                <label>
                  Extension Period
                </label>

                <select
                  value={extensionDays}
                  onChange={(e) =>
                    setExtensionDays(e.target.value)
                  }
                >
                  <option value="15">
                    15 Days
                  </option>

                  <option value="30">
                    30 Days
                  </option>

                  <option value="45">
                    45 Days
                  </option>

                  <option value="60">
                    60 Days
                  </option>

                </select>

              </FormGroup>

              <FormGroup>

                <label>
                  Reason for Extension
                </label>

                <textarea
                  value={extensionReason}
                  onChange={(e) =>
                    setExtensionReason(
                      e.target.value
                    )
                  }
                  placeholder="Enter reason for extending probation..."
                />

              </FormGroup>

            </ModalBody>

            <ModalFooter>

              <SecondaryButton
                onClick={() =>
                  setShowExtendModal(false)
                }
              >
                Cancel
              </SecondaryButton>

              <PrimaryButton
                onClick={handleExtendProbation}
              >
                Extend Probation
              </PrimaryButton>

            </ModalFooter>

          </Modal>

        </ModalOverlay>

      )}

      {/* =====================================================
          COMPLETE MODAL
      ===================================================== */}

      {showCompleteModal && (

        <ModalOverlay>

          <Modal small>

            <ModalHeader>

              <div>

                <h2>
                  Complete Probation?
                </h2>

                <p>
                  Are you sure you want to mark{" "}
                  <strong>{employee.name}</strong>{" "}
                  as completed?
                </p>

              </div>

              <CloseButton
                onClick={() =>
                  setShowCompleteModal(false)
                }
              >
                ×
              </CloseButton>

            </ModalHeader>

            <ModalBody>

              <ConfirmationBox>

                <ConfirmationIcon>
                  ✓
                </ConfirmationIcon>

                <div>

                  <strong>
                    Probation Completion
                  </strong>

                  <p>
                    Once completed, the employee will
                    no longer appear in the active
                    probation list.
                  </p>

                </div>

              </ConfirmationBox>

            </ModalBody>

            <ModalFooter>

              <SecondaryButton
                onClick={() =>
                  setShowCompleteModal(false)
                }
              >
                Cancel
              </SecondaryButton>

              <PrimaryButton
                onClick={handleCompleteProbation}
              >
                Confirm Completion
              </PrimaryButton>

            </ModalFooter>

          </Modal>

        </ModalOverlay>

      )}

      {/* =====================================================
          NOTIFICATION
      ===================================================== */}

      {notification && (

        <Toast>
          <ToastIcon>✓</ToastIcon>
          {notification}
        </Toast>

      )}

    </Page>
  );
}

/* =========================================================
   STYLES
========================================================= */

const Page = styled.div`
  min-height: 100vh;
  background: #f5f8fc;
  color: #173866;
  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;

  * {
    box-sizing: border-box;
  }
`;

/* =========================================================
   SIDEBAR
========================================================= */

const Sidebar = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 248px;
  background: #0c2245;
  color: white;
  z-index: 50;
`;

const LogoSection = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 17px;
  border-bottom: 1px solid
    rgba(255, 255, 255, 0.08);
`;

const LogoIcon = styled.div`
  font-size: 27px;
`;

const LogoText = styled.div`
  font-size: 20px;
  font-weight: 700;
  flex: 1;
`;

const MenuIcon = styled.div`
  font-size: 20px;
  cursor: pointer;
`;

const Navigation = styled.div`
  padding: 18px 9px;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 11px 13px;
  border-radius: 7px;
  margin-bottom: 4px;
  font-size: 12px;
  color: ${(props) =>
    props.active
      ? "#ffffff"
      : "rgba(255,255,255,0.78)"};

  background: ${(props) =>
    props.active
      ? "#1457bc"
      : "transparent"};

  cursor: pointer;

  &:hover {
    background: #154d9e;
  }
`;

const NavIcon = styled.span`
  width: 18px;
  text-align: center;
  font-size: 17px;
`;

const NavArrow = styled.span`
  margin-left: auto;
`;

const SubNavigation = styled.div`
  padding: 0 0 10px 37px;
`;

const SubNavItem = styled.div`
  padding: 8px 8px;
  border-radius: 5px;
  margin-bottom: 2px;
  font-size: 11px;
  color: ${(props) =>
    props.active
      ? "#ffffff"
      : "rgba(255,255,255,0.65)"};

  background: ${(props) =>
    props.active
      ? "#164da2"
      : "transparent"};

  cursor: pointer;
`;

/* =========================================================
   MAIN
========================================================= */

const Main = styled.main`
  margin-left: 248px;
  min-height: 100vh;
`;

const Header = styled.header`
  height: 60px;
  background: white;
  border-bottom: 1px solid #e3ebf4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 27px;
  position: sticky;
  top: 0;
  z-index: 20;
`;

const SearchBox = styled.div`
  width: 335px;
  height: 36px;
  border: 1px solid #dce6f1;
  border-radius: 7px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 11px;
  color: #7890ad;

  input {
    width: 100%;
    border: 0;
    outline: none;
    font-size: 11px;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 27px;
`;

const Notification = styled.div`
  position: relative;
  font-size: 22px;
  cursor: pointer;
`;

const NotificationCount = styled.span`
  position: absolute;
  top: -7px;
  right: -8px;
  width: 16px;
  height: 16px;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 9px;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;

  strong {
    display: block;
    font-size: 11px;
  }

  small {
    display: block;
    font-size: 9px;
    color: #8194ad;
    margin-top: 2px;
  }
`;

const UserImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
`;

/* =========================================================
   CONTENT
========================================================= */

const Content = styled.div`
  padding: 23px 25px;
`;

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
  color: #7890aa;
  margin-bottom: 18px;

  strong {
    color: #294b75;
  }
`;

/* =========================================================
   EMPLOYEE HEADER
========================================================= */

const EmployeeHeader = styled.div`
  background: white;
  border: 1px solid #dce7f3;
  border-radius: 9px;
  min-height: 96px;
  padding: 17px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const EmployeeMain = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const BackButton = styled.button`
  border: 0;
  background: #f3f7fc;
  color: #345879;
  width: 33px;
  height: 33px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 17px;
`;

const ProfileImage = styled.img`
  width: 61px;
  height: 61px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #edf4fc;
`;

const EmployeeBasic = styled.div``;

const EmployeeNameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  h1 {
    margin: 0;
    font-size: 20px;
    color: #143566;
  }
`;

const EmployeeDesignation = styled.div`
  font-size: 11px;
  color: #607895;
  margin-top: 5px;
`;

const EmployeeId = styled.div`
  font-size: 10px;
  color: #8295ad;
  margin-top: 5px;

  strong {
    color: #426181;
  }
`;

const StatusBadge = styled.span`
  padding: 5px 10px;
  border-radius: 7px;
  font-size: 9px;
  font-weight: 600;

  &.progress {
    color: #1e70d8;
    background: #e4f1ff;
  }

  &.completed {
    color: #07975e;
    background: #dcf7eb;
  }

  &.dueSoon {
    color: #df781d;
    background: #ffead8;
  }

  &.extended {
    color: #7944d0;
    background: #eee3ff;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 8px;
`;

/* =========================================================
   BUTTONS
========================================================= */

const SecondaryButton = styled.button`
  height: 34px;
  padding: 0 14px;
  border: 1px solid #d7e3ef;
  border-radius: 6px;
  background: white;
  color: #345575;
  font-size: 10px;
  cursor: pointer;

  &:hover {
    background: #f5f9fd;
  }
`;

const PrimaryButton = styled.button`
  height: 34px;
  padding: 0 15px;
  border: 0;
  border-radius: 6px;
  background: #176ce1;
  color: white;
  font-size: 10px;
  cursor: pointer;

  &:hover {
    background: #0e5dca;
  }
`;

/* =========================================================
   SUMMARY
========================================================= */

const SummaryCard = styled.div`
  background: white;
  border: 1px solid #dce7f3;
  border-radius: 9px;
  padding: 20px;
  margin-bottom: 15px;
`;

const SummaryTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SummaryTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;

  > span {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: #e7f2ff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2474df;
    font-size: 18px;
  }

  h2 {
    margin: 0;
    font-size: 14px;
    color: #173866;
  }

  p {
    margin: 4px 0 0;
    font-size: 10px;
    color: #7b90a9;
  }
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
  margin-top: 22px;
`;

const SummaryItem = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
`;

const SummaryIcon = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 7px;
  background: #f1f6fc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
`;

const ProgressSection = styled.div`
  margin-top: 23px;
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: #617996;

  strong {
    color: #196dd8;
  }
`;

const ProgressTrack = styled.div`
  height: 8px;
  background: #e9f0f7;
  border-radius: 10px;
  margin-top: 8px;
  overflow: hidden;
`;

const ProgressValue = styled.div`
  width: ${(props) =>
    props.completed ? "100%" : "82%"};
  height: 100%;
  background: #2677e7;
  border-radius: 10px;
`;

const ProgressFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 7px;
  font-size: 8px;
  color: #8195ae;
`;

/* =========================================================
   TABS
========================================================= */

const Tabs = styled.div`
  background: white;
  border: 1px solid #dce7f3;
  border-radius: 8px;
  padding: 0 15px;
  display: flex;
  gap: 25px;
  margin-bottom: 15px;
`;

const Tab = styled.button`
  border: 0;
  background: transparent;
  padding: 13px 3px 11px;
  color: ${(props) =>
    props.active ? "#176ce1" : "#6c839f"};
  border-bottom: 2px solid
    ${(props) =>
      props.active ? "#176ce1" : "transparent"};
  font-size: 10px;
  cursor: pointer;
`;

/* =========================================================
   OVERVIEW
========================================================= */

const Overview = styled.div`
  display: grid;
  grid-template-columns: 1.55fr 1fr;
  gap: 15px;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SectionCard = styled.div`
  background: white;
  border: 1px solid #dce7f3;
  border-radius: 8px;
  padding: 18px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 17px;

  h3 {
    margin: 0;
    font-size: 13px;
    color: #173866;
  }

  button {
    border: 0;
    background: transparent;
    color: #176ce1;
    font-size: 10px;
    cursor: pointer;
  }
`;

const InformationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px 25px;
`;

const InformationItem = styled.div`
  label {
    display: block;
    font-size: 9px;
    color: #8195ad;
    margin-bottom: 5px;
  }

  strong {
    font-size: 10px;
    color: #365574;
  }
`;

/* =========================================================
   MANAGER
========================================================= */

const Manager = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ManagerImage = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
`;

const ManagerDetails = styled.div`
  flex: 1;

  strong {
    display: block;
    font-size: 11px;
    color: #294b70;
  }

  span {
    display: block;
    font-size: 9px;
    color: #7186a0;
    margin-top: 3px;
  }

  small {
    display: block;
    font-size: 8px;
    color: #91a1b5;
    margin-top: 3px;
  }
`;

/* =========================================================
   METRICS
========================================================= */

const Metric = styled.div`
  margin-bottom: 18px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const MetricHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: #607895;
  margin-bottom: 7px;

  strong {
    color: #1b6fda;
  }
`;

const MetricTrack = styled.div`
  height: 7px;
  background: #edf2f7;
  border-radius: 10px;
  overflow: hidden;
`;

const MetricProgress = styled.div`
  width: ${(props) => props.width}%;
  height: 100%;
  background: #2678e8;
  border-radius: 10px;
`;

/* =========================================================
   ACTIONS
========================================================= */

const ActionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const ActionButton = styled.button`
  width: 100%;
  border: 1px solid #e3ebf3;
  background: white;
  border-radius: 7px;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: #f8fbff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  > div:nth-child(2) {
    flex: 1;
  }

  strong {
    display: block;
    font-size: 10px;
    color: #294c72;
  }

  span {
    color: #7b91aa;
  }

  div span {
    display: block;
    font-size: 8px;
    color: #8195ad;
    margin-top: 3px;
  }
`;

const ActionIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;

  background: ${(props) =>
    props.green
      ? "#e0f7ed"
      : props.purple
      ? "#eee5ff"
      : "#e6f2ff"};

  color: ${(props) =>
    props.green
      ? "#0b9b63"
      : props.purple
      ? "#8146d4"
      : "#2174df"};
`;

/* =========================================================
   PERFORMANCE
========================================================= */

const PerformanceGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 15px;
`;

const PerformanceCard = styled(SectionCard)`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  h3 {
    font-size: 13px;
    color: #173866;
    margin: 15px 0 5px;
  }

  p {
    font-size: 9px;
    color: #7c90a8;
    line-height: 16px;
    max-width: 220px;
  }
`;

const PerformanceCircle = styled.div`
  width: 125px;
  height: 125px;
  border-radius: 50%;
  background: conic-gradient(
    #2678e8 ${(props) => props.value}%,
    #eaf0f6 ${(props) => props.value}%
  );
  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    width: 91px;
    height: 91px;
    border-radius: 50%;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  strong {
    font-size: 22px;
    color: #173866;
  }

  span {
    font-size: 9px;
    color: #8094ac;
  }
`;

/* =========================================================
   DOCUMENTS
========================================================= */

const DocumentList = styled.div`
  display: flex;
  flex-direction: column;
`;

const DocumentItem = styled.div`
  min-height: 60px;
  border-top: 1px solid #edf2f7;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const DocumentIcon = styled.div`
  width: 36px;
  height: 40px;
  border-radius: 5px;
  background: #fff0f0;
  color: #e24949;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 8px;
  font-weight: 700;
`;

const DocumentInfo = styled.div`
  flex: 1;

  strong {
    display: block;
    font-size: 10px;
    color: #294c72;
  }

  span {
    display: block;
    font-size: 8px;
    color: #8396ad;
    margin-top: 4px;
  }
`;

const DocumentAction = styled.button`
  border: 1px solid #dce6f1;
  background: white;
  color: #236ed5;
  border-radius: 5px;
  padding: 6px 11px;
  font-size: 9px;
  cursor: pointer;
`;

/* =========================================================
   TIMELINE
========================================================= */

const Timeline = styled.div`
  padding-left: 5px;
`;

const TimelineItem = styled.div`
  display: flex;
  gap: 13px;
  min-height: 80px;
  position: relative;

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    left: 15px;
    top: 34px;
    bottom: 0;
    width: 1px;
    background: #dce7f2;
  }
`;

const TimelineIcon = styled.div`
  width: 31px;
  height: 31px;
  border-radius: 50%;
  background: #e8f2ff;
  color: #2274df;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  font-size: 12px;
`;

const TimelineContent = styled.div`
  flex: 1;
`;

const TimelineTop = styled.div`
  display: flex;
  justify-content: space-between;

  strong {
    font-size: 11px;
    color: #294c72;
  }

  span {
    font-size: 8px;
    color: #8599b0;
  }
`;

const TimelineContentP = styled.p``;

const TimelineContentStyled = styled.div``;

const TimelineContentText = styled.p`
  font-size: 9px;
  color: #758aa3;
  margin: 5px 0 0;
  line-height: 15px;
`;

/* =========================================================
   BOTTOM
========================================================= */

const BottomActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 18px;

  > div {
    display: flex;
    gap: 8px;
  }
`;

/* =========================================================
   MODAL
========================================================= */

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(7, 24, 48, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
`;

const Modal = styled.div`
  width: ${(props) =>
    props.small ? "430px" : "500px"};
  max-width: 100%;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.22);
`;

const ModalHeader = styled.div`
  padding: 18px 20px;
  border-bottom: 1px solid #e5edf5;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  h2 {
    margin: 0;
    font-size: 16px;
    color: #173866;
  }

  p {
    margin: 6px 0 0;
    font-size: 10px;
    color: #7890a9;
    line-height: 16px;
  }
`;

const CloseButton = styled.button`
  border: 0;
  background: transparent;
  font-size: 23px;
  color: #8194ab;
  cursor: pointer;
`;

const ModalBody = styled.div`
  padding: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 17px;

  label {
    display: block;
    font-size: 10px;
    color: #516b88;
    margin-bottom: 6px;
  }

  select,
  textarea {
    width: 100%;
    border: 1px solid #d9e4ef;
    border-radius: 6px;
    outline: none;
    padding: 9px;
    font-size: 10px;
    color: #304f70;
  }

  textarea {
    min-height: 100px;
    resize: vertical;
    font-family: inherit;
  }
`;

const ModalFooter = styled.div`
  border-top: 1px solid #e5edf5;
  padding: 13px 20px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const ConfirmationBox = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 15px;
  background: #f3faf7;
  border: 1px solid #cfeee0;
  border-radius: 7px;

  strong {
    font-size: 11px;
    color: #1d654c;
  }

  p {
    margin: 5px 0 0;
    font-size: 9px;
    color: #668b7d;
    line-height: 15px;
  }
`;

const ConfirmationIcon = styled.div`
  width: 40px;
  height: 40px;
  background: #d9f4e8;
  color: #079860;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

/* =========================================================
   TOAST
========================================================= */

const Toast = styled.div`
  position: fixed;
  right: 25px;
  bottom: 25px;
  background: #12375f;
  color: white;
  padding: 12px 17px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
  z-index: 200;
`;

const ToastIcon = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #16a875;
  display: flex;
  justify-content: center;
  align-items: center;
`;

/* =========================================================
   RESPONSIVE
========================================================= */

const ResponsiveStyle = styled.div`
  @media (max-width: 1100px) {
    ${SummaryGrid} {
      grid-template-columns: repeat(3, 1fr);
    }

    ${Overview} {
      grid-template-columns: 1fr;
    }

    ${PerformanceGrid} {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 800px) {
    ${Sidebar} {
      width: 70px;
    }

    ${LogoText},
    ${NavItem} span,
    ${SubNavigation},
    ${NavArrow} {
      display: none;
    }

    ${Main} {
      margin-left: 70px;
    }

    ${SearchBox} {
      width: 220px;
    }

    ${SummaryGrid} {
      grid-template-columns: repeat(2, 1fr);
    }

    ${EmployeeHeader} {
      align-items: flex-start;
      gap: 15px;
    }

    ${HeaderActions} {
      display: none;
    }
  }

  @media (max-width: 600px) {
    ${Content} {
      padding: 14px;
    }

    ${Header} {
      padding: 0 12px;
    }

    ${HeaderRight} {
      gap: 10px;
    }

    ${SearchBox} {
      width: 170px;
    }

    ${UserSection} div {
      display: none;
    }

    ${SummaryGrid} {
      grid-template-columns: 1fr;
    }

    ${InformationGrid} {
      grid-template-columns: 1fr;
    }

    ${Tabs} {
      overflow-x: auto;
      gap: 18px;
    }

    ${EmployeeHeader} {
      flex-direction: column;
    }

    ${BottomActions} {
      flex-direction: column;
      gap: 10px;

      > div {
        justify-content: flex-end;
      }
    }
  }
`;

export default ProbationDetails;