import styled from "styled-components";

// =====================================================
// PAGE
// =====================================================

export const Page = styled.div`
  min-height: 100vh;
  background:  #f8e7c9;
  color:  #064e3b;
  padding: 30px;
 
  font-family: Arial, sans-serif;
  margin-left:250px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

// =====================================================
// HEADER
// =====================================================

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 25px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const HeaderLeft = styled.div``;

export const BackButton = styled.button`
  border: none;
  background: transparent;
  color: #2563eb;
  cursor: pointer;
  font-size: 14px;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

export const Title = styled.h1`
  margin: 12px 0 5px;
  font-size: 28px;
  color: #0f172a;

  @media (max-width: 600px) {
    font-size: 24px;
  }
`;

export const Subtitle = styled.p`
  margin: 0;
  color: #64748b;
  font-size: 14px;
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

// =====================================================
// BUTTON
// =====================================================

export const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 11px 16px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s ease;

  background: ${({ variant }) => {
    if (variant === "primary") return "#2563eb";
    if (variant === "light") return "#eff6ff";
    return "#f1f5f9";
  }};

  color: ${({ variant }) => {
    if (variant === "primary") return "#ffffff";
    if (variant === "light") return "#2563eb";
    return "#334155";
  }};

  &:hover {
    transform: translateY(-1px);
    opacity: 0.9;
  }

  @media (max-width: 600px) {
    flex: 1;
  }
`;

// =====================================================
// EMPLOYEE CARD
// =====================================================

export const EmployeeCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 25px;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Avatar = styled.div`
  width: 70px;
  height: 70px;
  min-width: 70px;
  border-radius: 50%;
  background: #dbeafe;
  color: #2563eb;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 28px;
  font-weight: bold;
`;

export const EmployeeInfo = styled.div`
  flex: 1;
`;

export const EmployeeName = styled.h2`
  margin: 0 0 5px;
  color: #0f172a;
  font-size: 22px;
`;

export const EmployeeDesignation = styled.p`
  margin: 0 0 12px;
  color: #64748b;
`;

export const EmployeeMeta = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

export const MetaItem = styled.span`
  color: #64748b;
  font-size: 14px;
`;

export const StatusSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;

  @media (max-width: 768px) {
    align-items: flex-start;
  }
`;

export const StatusLabel = styled.span`
  font-size: 12px;
  color: #64748b;
`;

export const StatusBadge = styled.span`
  background: #dcfce7;
  color: #15803d;
  padding: 7px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
`;

// =====================================================
// SECTION
// =====================================================

export const Section = styled.section`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 24px;
  margin-bottom: 20px;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 15px;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  font-size: 19px;
  color: #0f172a;
`;

export const SectionSubtitle = styled.p`
  margin: 5px 0 0;
  color: #64748b;
  font-size: 13px;
`;

// =====================================================
// EMPLOYEE INFORMATION
// =====================================================

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const InfoLabel = styled.span`
  color: #64748b;
  font-size: 13px;
`;

export const InfoValue = styled.strong`
  color: #334155;
  font-size: 15px;
`;

// =====================================================
// PROGRESS
// =====================================================

export const ProgressWrapper = styled.div`
  margin-bottom: 25px;
`;

export const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;

  span {
    color: #64748b;
    font-size: 13px;
  }

  strong {
    color: #475569;
    font-size: 13px;
  }
`;

export const Percentage = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #2563eb;
`;

export const ProgressTrack = styled.div`
  width: 100%;
  height: 10px;
  background: #e2e8f0;
  border-radius: 20px;
  overflow: hidden;
`;

export const ProgressFill = styled.div`
  height: 100%;
  width: ${({ progress }) => progress}%;
  background: #2563eb;
  border-radius: 20px;
  transition: width 0.5s ease;
`;

// =====================================================
// DATE CARDS
// =====================================================

export const DateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const DateCard = styled.div`
  padding: 16px;
  background: #f8fafc;
  border-radius: 10px;
`;

export const DateLabel = styled.span`
  display: block;
  color: #64748b;
  font-size: 13px;
  margin-bottom: 7px;
`;

export const DateValue = styled.strong`
  color: #334155;
`;

// =====================================================
// TWO COLUMN
// =====================================================

export const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

// =====================================================
// PERFORMANCE
// =====================================================

export const PerformanceItem = styled.div`
  margin-bottom: 18px;
`;

export const PerformanceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 7px;
`;

export const PerformanceLabel = styled.span`
  color: #475569;
  font-size: 14px;
`;

export const PerformanceValue = styled.strong`
  color: #2563eb;
`;

export const PerformanceTrack = styled.div`
  height: 8px;
  background: #e2e8f0;
  border-radius: 20px;
  overflow: hidden;
`;

export const PerformanceFill = styled.div`
  height: 100%;
  width: ${({ progress }) => progress}%;
  background: #2563eb;
  border-radius: 20px;
  transition: width 0.5s ease;
`;

export const OverallScore = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #e2e8f0;
  margin-top: 20px;
  padding-top: 18px;

  span {
    color: #475569;
  }

  strong {
    color: #16a34a;
    font-size: 20px;
  }
`;

// =====================================================
// MANAGER
// =====================================================

export const ManagerCard = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  background: #f8fafc;
  padding: 20px;
  border-radius: 10px;
`;

export const ManagerAvatar = styled.div`
  width: 50px;
  height: 50px;
  min-width: 50px;
  border-radius: 50%;
  background: #dbeafe;
  color: #2563eb;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;
  font-size: 20px;
`;

export const ManagerInfo = styled.div``;

export const ManagerName = styled.h3`
  margin: 0 0 5px;
  color: #0f172a;
`;

export const ManagerDesignation = styled.p`
  margin: 0 0 5px;
  color: #64748b;
`;

export const ManagerEmail = styled.span`
  color: #64748b;
  font-size: 13px;
`;

// =====================================================
// TIMELINE
// =====================================================

export const Timeline = styled.div`
  position: relative;
`;

export const TimelineItem = styled.div`
  position: relative;
  display: flex;
  gap: 20px;
  padding-bottom: 30px;

  &:last-child {
    padding-bottom: 0;
  }
`;

export const TimelineLine = styled.div`
  position: absolute;
  left: 11px;
  top: 25px;
  width: 2px;
  height: calc(100% - 10px);
  background: #e2e8f0;
`;

export const TimelineDot = styled.div`
  width: 24px;
  height: 24px;
  min-width: 24px;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 1;

  font-size: 12px;

  background: ${({ status }) => {
    if (status === "completed") return "#22c55e";
    if (status === "current") return "#2563eb";
    return "#e2e8f0";
  }};

  color: white;
`;

export const TimelineContent = styled.div`
  flex: 1;
`;

export const TimelineHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 5px;
  }
`;

export const TimelineTitle = styled.h3`
  margin: 0;
  font-size: 15px;
  color: #334155;
`;

export const TimelineDate = styled.span`
  font-size: 13px;
  color: #64748b;
`;

export const TimelineDescription = styled.p`
  margin: 7px 0 0;
  color: #64748b;
  font-size: 14px;
`;

// =====================================================
// DOCUMENTS
// =====================================================

export const DocumentsTable = styled.div`
  width: 100%;
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 0.7fr;
  gap: 15px;
  padding: 12px;
  background: #f8fafc;
  color: #64748b;
  font-size: 13px;
  font-weight: 600;

  @media (max-width: 700px) {
    display: none;
  }
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 0.7fr;
  align-items: center;
  gap: 15px;
  padding: 16px 12px;
  border-bottom: 1px solid #e2e8f0;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

export const TableCell = styled.div`
  color: #475569;
  font-size: 14px;
`;

export const DocumentName = styled.span`
  font-weight: 600;
  color: #334155;
`;

export const DocumentStatus = styled.span`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: 600;

  background: ${({ status }) =>
    status === "Verified"
      ? "#dcfce7"
      : "#fef3c7"};

  color: ${({ status }) =>
    status === "Verified"
      ? "#15803d"
      : "#b45309"};
`;

export const ViewButton = styled.button`
  border: none;
  background: #eff6ff;
  color: #2563eb;
  padding: 7px 12px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #dbeafe;
  }
`;

// =====================================================
// MODAL
// =====================================================

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;

  background: rgba(15, 23, 42, 0.5);

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 1000;

  padding: 20px;
`;

export const Modal = styled.div`
  width: 420px;
  max-width: 100%;

  background: white;
  border-radius: 14px;
  padding: 25px;

  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
`;

export const ModalTitle = styled.h2`
  margin: 0 0 15px;
  color: #0f172a;
`;

export const ModalText = styled.p`
  color: #64748b;
  line-height: 1.6;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 25px;
`;

export const CancelButton = styled.button`
  border: none;
  background: #f1f5f9;
  color: #334155;

  padding: 10px 15px;
  border-radius: 7px;

  cursor: pointer;
  font-weight: 600;
`;

export const ConfirmButton = styled.button`
  border: none;
  background: #2563eb;
  color: white;

  padding: 10px 15px;
  border-radius: 7px;

  cursor: pointer;
  font-weight: 600;

  &:hover {
    background: #1d4ed8;
  }
`;