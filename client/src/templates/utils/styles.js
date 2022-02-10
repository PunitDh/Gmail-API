import styled from "@emotion/styled";

export const Table = styled.table({
  display: "flex",
  flexDirection: "column",
  maxWidth: "80vw",
});

export const TableRow = styled.tr({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  maxWidth: "100%",
  borderBottom: "1px solid #ccc",
});

export const TableHead = styled.th({
  display: "inline-flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  maxWidth: "100%",
  fontWeight: "bold",
  borderBottom: "3px solid rgba(0,0,0,0.3)",
});

export const TableBody = styled.tbody({
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
});

export const TableHeadCell = styled.td({
  display: "block",
  textAlign: "left",
  width: "100%",
});

export const TableCell = ({ emailId, children }) => (
  <label
    htmlFor={`checkbox-${emailId}`}
    style={{
      cursor: "pointer",
      height: "100%",
      width: "100%",
    }}
  >
    <td
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      {children}
    </td>
  </label>
);

export const EmailsContainer = styled.div({
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "column",
  width: "80vw",
});

export const LoadingBarContainer = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
});
