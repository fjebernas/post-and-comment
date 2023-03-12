import { Pagination } from "react-bootstrap";

function PaginationLinks(props) {

  let active = props.currentPage + 1;
  let items = [];
  for (let number = 1; number <= props.totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => props.handlePaginateButton(number - 1)}
      >
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <div className="ms-3">
      <Pagination>{items}</Pagination>
    </div>
  );
}

export default PaginationLinks;