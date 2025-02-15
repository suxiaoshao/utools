import { CommonStyle } from '@http/hooks/useRestyle';
import type { PureCookie } from '@http/types/httpForm';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import dayjs from 'dayjs';
import { match, P } from 'ts-pattern';

export interface CookiesProps {
  cookies: PureCookie[];
}

export default function Cookies({ cookies }: CookiesProps) {
  return (
    <TableContainer sx={CommonStyle.tableContainer} component={Paper}>
      <Table stickyHeader size="small" sx={CommonStyle.table}>
        {/* 表头 */}
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Domain</TableCell>
            <TableCell>Expires</TableCell>
            <TableCell>HttpOnly</TableCell>
            <TableCell>MaxAge</TableCell>
            <TableCell>Path</TableCell>
            <TableCell>SameSite</TableCell>
            <TableCell>Secure</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ flex: 1 }}>
          {cookies.map(({ name, value, domain, expires, httpOnly, maxAge, path, sameSite, secure }, index) => (
            <TableRow key={`${name}${index}`}>
              <TableCell>{name}</TableCell>
              <TableCell>{value}</TableCell>
              <TableCell>
                {match(domain)
                  .with(P.nullish, () => '-')
                  .otherwise(() => domain)}
              </TableCell>
              <TableCell>
                {match(expires)
                  .with(P.nullish, () => 'Session')
                  .otherwise(() => dayjs(expires).format())}
              </TableCell>
              <TableCell>{String(httpOnly)}</TableCell>
              <TableCell>
                {match(maxAge)
                  .with(P.nullish, () => '-')
                  .otherwise(() => maxAge)}
              </TableCell>
              <TableCell>{path}</TableCell>
              <TableCell>{sameSite}</TableCell>
              <TableCell>{String(secure)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
