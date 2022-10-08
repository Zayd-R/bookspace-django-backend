import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

const BasicPagination = ({ nPages, currentPage, handlePageChange }) => {
  return (
    <Stack spacing={2}>
      <Pagination
        count={nPages}
        page={currentPage}
        color='primary'
        onChange={handlePageChange}
      />
    </Stack>
  )
}

export default BasicPagination
