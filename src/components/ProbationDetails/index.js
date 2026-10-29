import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Page,
  Header,
  HeaderLeft,
  Title,
  Subtitle,
  HeaderActions,
  Button,
  EmployeeCard,
  Avatar,
  EmployeeInfo,
  EmployeeName,
  EmployeeDesignation,
  EmployeeMeta,
  MetaItem,
  StatusSection,
  StatusLabel,
  StatusBadge,
  Section,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  InfoGrid,
  InfoItem,
  InfoLabel,
  InfoValue,
  ProgressWrapper,
  ProgressHeader,
  Percentage,
  ProgressTrack,
  ProgressFill,
  DateGrid,
  DateCard,
  DateLabel,
  DateValue,
  TwoColumnGrid,
  PerformanceItem,
  PerformanceHeader,
  PerformanceLabel,
  PerformanceValue,
  PerformanceTrack,
  PerformanceFill,
  OverallScore,
  ManagerCard,
  ManagerAvatar,
  ManagerInfo,
  ManagerName,
  ManagerDesignation,
  ManagerEmail,
  Timeline,
  TimelineItem,
  TimelineLine,
  TimelineDot,
  TimelineContent,
  TimelineHeader,
  TimelineTitle,
  TimelineDate,
  TimelineDescription,
  DocumentsTable,
  TableHeader,
  TableRow,
  TableCell,
  DocumentName,
  DocumentStatus,
  ViewButton,
  ModalOverlay,
  Modal,
  ModalTitle,
  ModalText,
  ModalActions,
  CancelButton,
  ConfirmButton,
} from "./styledComponents";

import NavSection from "../NavSection";
import { NavbarContainer } from "../NavSection/styledComponents";
// =====================================================
// MOCK DATA
// =====================================================

const mockProbationData = {
  101: {
    employee: {
      id: 101,
      name: "Rahul Sharma",
      employeeId: "EMP001",
      email: "rahul.sharma@hirenest.com",
      phone: "+91 9876543210",
      department: "Engineering",
      domain: "Frontend Development",
      designation: "Junior Software Engineer",
      joiningDate: "2026-07-01",
      location: "Bangalore",
    },

    probation: {
      startDate: "2026-07-01",
      endDate: "2026-12-31",
      duration: "6 Months",
      status: "Active",
      progress: 50,
      remainingDays: 93,
    },

    manager: {
      name: "Priya Reddy",
      designation: "Engineering Manager",
      email: "priya.reddy@hirenest.com",
    },

    performance: {
      technicalSkills: 85,
      communication: 78,
      teamwork: 90,
      punctuality: 95,
      overall: 87,
    },

    documents: [
      {
        id: 1,
        name: "Offer Letter",
        type: "PDF",
        status: "Verified",
        date: "2026-07-01",
      },
      {
        id: 2,
        name: "ID Proof",
        type: "PDF",
        status: "Verified",
        date: "2026-07-02",
      },
      {
        id: 3,
        name: "Joining Documents",
        type: "PDF",
        status: "Pending",
        date: "2026-07-03",
      },
    ],

    timeline: [
      {
        date: "2026-07-01",
        title: "Probation Started",
        description: "Employee joined the organization.",
        status: "completed",
      },
      {
        date: "2026-08-01",
        title: "First Month Review",
        description: "Initial performance review completed.",
        status: "completed",
      },
      {
        date: "2026-09-01",
        title: "Second Month Review",
        description: "Performance and learning progress reviewed.",
        status: "completed",
      },
      {
        date: "2026-10-01",
        title: "Third Month Review",
        description: "Mid-probation performance evaluation.",
        status: "current",
      },
      {
        date: "2026-12-31",
        title: "Probation Completion",
        description: "Final probation evaluation and confirmation.",
        status: "upcoming",
      },
    ],
  },

  102: {
    employee: {
      id: 102,
      name: "Sneha Reddy",
      employeeId: "EMP002",
      email: "sneha.reddy@hirenest.com",
      phone: "+91 9123456780",
      department: "Design",
      domain: "UI/UX Design",
      designation: "UI/UX Designer",
      joiningDate: "2026-06-15",
      location: "Hyderabad",
    },

    probation: {
      startDate: "2026-06-15",
      endDate: "2026-12-15",
      duration: "6 Months",
      status: "Active",
      progress: 58,
      remainingDays: 77,
    },

    manager: {
      name: "Arjun Kumar",
      designation: "Design Manager",
      email: "arjun.kumar@hirenest.com",
    },

    performance: {
      technicalSkills: 88,
      communication: 92,
      teamwork: 86,
      punctuality: 90,
      overall: 89,
    },

    documents: [
      {
        id: 1,
        name: "Offer Letter",
        type: "PDF",
        status: "Verified",
        date: "2026-06-15",
      },
      {
        id: 2,
        name: "ID Proof",
        type: "PDF",
        status: "Verified",
        date: "2026-06-16",
      },
    ],

    timeline: [
      {
        date: "2026-06-15",
        title: "Probation Started",
        description: "Employee joined the organization.",
        status: "completed",
      },
      {
        date: "2026-07-15",
        title: "First Month Review",
        description: "Initial performance review completed.",
        status: "completed",
      },
      {
        date: "2026-08-15",
        title: "Second Month Review",
        description: "Performance review completed successfully.",
        status: "completed",
      },
      {
        date: "2026-09-15",
        title: "Third Month Review",
        description: "Current probation review.",
        status: "current",
      },
      {
        date: "2026-12-15",
        title: "Probation Completion",
        description: "Final probation evaluation.",
        status: "upcoming",
      },
    ],
  },
};

const ProbationDetails = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();

  const [showExtendModal, setShowExtendModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const employeeData =
    mockProbationData[employeeId] || mockProbationData[101];

  const {
    employee,
    probation,
    manager,
    performance,
    documents,
    timeline,
  } = employeeData;

  // =====================================================
  // ACTIONS
  // =====================================================

  const handleExtendProbation = () => {
    setShowExtendModal(false);

    alert(
      `Probation extension request created for ${employee.name}`
    );
  };

  const handleCompleteProbation = () => {
    setShowCompleteModal(false);

    alert(
      `Probation completed successfully for ${employee.name}`
    );
  };

  return (
    <Page>
      <NavSection/>
      <Header>

        <HeaderLeft>

          <Title>Probation Details</Title>

          <Subtitle>
            View and manage employee probation information
          </Subtitle>

        </HeaderLeft>

        <HeaderActions>

          <Button
            variant="secondary"
            onClick={() => setShowExtendModal(true)}
          >
            Extend Probation
          </Button>

          <Button
            variant="primary"
            onClick={() => setShowCompleteModal(true)}
          >
            Complete Probation
          </Button>

        </HeaderActions>

      </Header>

      {/* =================================================
          EMPLOYEE PROFILE
      ================================================= */}

      <EmployeeCard>

        <Avatar>
          {employee.name.charAt(0)}
        </Avatar>

        <EmployeeInfo>

          <EmployeeName>
            {employee.name}
          </EmployeeName>

          <EmployeeDesignation>
            {employee.designation} • {employee.employeeId}
          </EmployeeDesignation>

          <EmployeeMeta>

            <MetaItem>
              ✉ {employee.email}
            </MetaItem>

            <MetaItem>
              ☎ {employee.phone}
            </MetaItem>

            <MetaItem>
              📍 {employee.location}
            </MetaItem>

          </EmployeeMeta>

        </EmployeeInfo>

        <StatusSection>

          <StatusLabel>
            Probation Status
          </StatusLabel>

          <StatusBadge>
            {probation.status}
          </StatusBadge>

        </StatusSection>

      </EmployeeCard>

      {/* =================================================
          EMPLOYEE INFORMATION
      ================================================= */}

      <Section>

        <SectionHeader>
          <div>
            <SectionTitle>
              Employee Information
            </SectionTitle>
          </div>
        </SectionHeader>

        <InfoGrid>

          <InfoItem>
            <InfoLabel>Employee ID</InfoLabel>
            <InfoValue>{employee.employeeId}</InfoValue>
          </InfoItem>

          <InfoItem>
            <InfoLabel>Department</InfoLabel>
            <InfoValue>{employee.department}</InfoValue>
          </InfoItem>

          <InfoItem>
            <InfoLabel>Domain</InfoLabel>
            <InfoValue>{employee.domain}</InfoValue>
          </InfoItem>

          <InfoItem>
            <InfoLabel>Designation</InfoLabel>
            <InfoValue>{employee.designation}</InfoValue>
          </InfoItem>

          <InfoItem>
            <InfoLabel>Joining Date</InfoLabel>
            <InfoValue>{employee.joiningDate}</InfoValue>
          </InfoItem>

          <InfoItem>
            <InfoLabel>Location</InfoLabel>
            <InfoValue>{employee.location}</InfoValue>
          </InfoItem>

        </InfoGrid>

      </Section>

      {/* =================================================
          PROBATION OVERVIEW
      ================================================= */}

      <Section>

        <SectionHeader>

          <div>

            <SectionTitle>
              Probation Overview
            </SectionTitle>

            <SectionSubtitle>
              Current probation progress
            </SectionSubtitle>

          </div>

          <Percentage>
            {probation.progress}%
          </Percentage>

        </SectionHeader>

        <ProgressWrapper>

          <ProgressHeader>

            <span>Progress</span>

            <strong>
              {probation.remainingDays} days remaining
            </strong>

          </ProgressHeader>

          <ProgressTrack>

            <ProgressFill
              progress={probation.progress}
            />

          </ProgressTrack>

        </ProgressWrapper>

        <DateGrid>

          <DateCard>
            <DateLabel>Start Date</DateLabel>
            <DateValue>
              {probation.startDate}
            </DateValue>
          </DateCard>

          <DateCard>
            <DateLabel>End Date</DateLabel>
            <DateValue>
              {probation.endDate}
            </DateValue>
          </DateCard>

          <DateCard>
            <DateLabel>Duration</DateLabel>
            <DateValue>
              {probation.duration}
            </DateValue>
          </DateCard>

          <DateCard>
            <DateLabel>Remaining</DateLabel>
            <DateValue>
              {probation.remainingDays} Days
            </DateValue>
          </DateCard>

        </DateGrid>

      </Section>

      {/* =================================================
          PERFORMANCE + MANAGER
      ================================================= */}

      <TwoColumnGrid>

        <Section>

          <SectionHeader>
            <SectionTitle>
              Performance Summary
            </SectionTitle>
          </SectionHeader>

          <PerformanceBar
            label="Technical Skills"
            value={performance.technicalSkills}
          />

          <PerformanceBar
            label="Communication"
            value={performance.communication}
          />

          <PerformanceBar
            label="Teamwork"
            value={performance.teamwork}
          />

          <PerformanceBar
            label="Punctuality"
            value={performance.punctuality}
          />

          <OverallScore>

            <span>
              Overall Performance
            </span>

            <strong>
              {performance.overall}%
            </strong>

          </OverallScore>

        </Section>

        <Section>

          <SectionHeader>
            <SectionTitle>
              Reporting Manager
            </SectionTitle>
          </SectionHeader>

          <ManagerCard>

            <ManagerAvatar>
              {manager.name.charAt(0)}
            </ManagerAvatar>

            <ManagerInfo>

              <ManagerName>
                {manager.name}
              </ManagerName>

              <ManagerDesignation>
                {manager.designation}
              </ManagerDesignation>

              <ManagerEmail>
                ✉ {manager.email}
              </ManagerEmail>

            </ManagerInfo>

          </ManagerCard>

        </Section>

      </TwoColumnGrid>

      {/* =================================================
          TIMELINE
      ================================================= */}

      <Section>

        <SectionHeader>
          <SectionTitle>
            Probation Timeline
          </SectionTitle>
        </SectionHeader>

        <Timeline>

          {timeline.map((item, index) => (

            <TimelineItem
              key={index}
              status={item.status}
            >

              {index !== timeline.length - 1 && (
                <TimelineLine />
              )}

              <TimelineDot status={item.status}>
                {item.status === "completed"
                  ? "✓"
                  : item.status === "current"
                  ? "●"
                  : ""}
              </TimelineDot>

              <TimelineContent>

                <TimelineHeader>

                  <TimelineTitle>
                    {item.title}
                  </TimelineTitle>

                  <TimelineDate>
                    {item.date}
                  </TimelineDate>

                </TimelineHeader>

                <TimelineDescription>
                  {item.description}
                </TimelineDescription>

              </TimelineContent>

            </TimelineItem>

          ))}

        </Timeline>

      </Section>

      {/* =================================================
          DOCUMENTS
      ================================================= */}

      <Section>

        <SectionHeader>

          <div>

            <SectionTitle>
              Documents
            </SectionTitle>

            <SectionSubtitle>
              Employee probation documents
            </SectionSubtitle>

          </div>

          <Button
            variant="light"
            onClick={() =>
              navigate("/documents/upload")
            }
          >
            + Upload Document
          </Button>

        </SectionHeader>

        <DocumentsTable>

          <TableHeader>

            <TableCell>Document</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>

          </TableHeader>

          {documents.map((document) => (

            <TableRow key={document.id}>

              <TableCell>

                <DocumentName>
                  📄 {document.name}
                </DocumentName>

              </TableCell>

              <TableCell>
                {document.type}
              </TableCell>

              <TableCell>
                {document.date}
              </TableCell>

              <TableCell>

                <DocumentStatus
                  status={document.status}
                >
                  {document.status}
                </DocumentStatus>

              </TableCell>

              <TableCell>

                <ViewButton
                  onClick={() =>
                    alert(
                      `Opening ${document.name}`
                    )
                  }
                >
                  View
                </ViewButton>

              </TableCell>

            </TableRow>

          ))}

        </DocumentsTable>

      </Section>

      {/* =================================================
          EXTEND MODAL
      ================================================= */}

      {showExtendModal && (

        <ModalOverlay>

          <Modal>

            <ModalTitle>
              Extend Probation
            </ModalTitle>

            <ModalText>
              Are you sure you want to extend the
              probation period for{" "}
              <strong>{employee.name}</strong>?
            </ModalText>

            <ModalActions>

              <CancelButton
                onClick={() =>
                  setShowExtendModal(false)
                }
              >
                Cancel
              </CancelButton>

              <ConfirmButton
                onClick={handleExtendProbation}
              >
                Confirm Extension
              </ConfirmButton>

            </ModalActions>

          </Modal>

        </ModalOverlay>

      )}

      {/* =================================================
          COMPLETE MODAL
      ================================================= */}

      {showCompleteModal && (

        <ModalOverlay>

          <Modal>

            <ModalTitle>
              Complete Probation
            </ModalTitle>

            <ModalText>
              Are you sure you want to mark{" "}
              <strong>{employee.name}</strong>{" "}
              as having completed probation?
            </ModalText>

            <ModalActions>

              <CancelButton
                onClick={() =>
                  setShowCompleteModal(false)
                }
              >
                Cancel
              </CancelButton>

              <ConfirmButton
                onClick={handleCompleteProbation}
              >
                Complete Probation
              </ConfirmButton>

            </ModalActions>

          </Modal>

        </ModalOverlay>

      )}

    </Page>
  );
};

// =====================================================
// PERFORMANCE BAR COMPONENT
// =====================================================

const PerformanceBar = ({ label, value }) => {
  return (
    <PerformanceItem>

      <PerformanceHeader>

        <PerformanceLabel>
          {label}
        </PerformanceLabel>

        <PerformanceValue>
          {value}%
        </PerformanceValue>

      </PerformanceHeader>

      <PerformanceTrack>

        <PerformanceFill
          progress={value}
        />

      </PerformanceTrack>

    </PerformanceItem>
  );
};

export default ProbationDetails;