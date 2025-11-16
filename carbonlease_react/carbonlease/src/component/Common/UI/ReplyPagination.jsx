import { Wrapper, Btn } from "./ReplyPagination.styles.js";

const ReplyPagination = ({ page, totalPages, onChange }) => (
  <Wrapper>
    {Array.from({ length: totalPages }, (_, i) => (
      <Btn
        key={i}
        className={page === i + 1 ? "active" : ""}
        onClick={() => onChange(i + 1)}
      >
        {i + 1}
      </Btn>
    ))}
  </Wrapper>
);

export default ReplyPagination;