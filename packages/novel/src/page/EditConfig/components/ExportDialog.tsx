import { ButtonBase, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { ToggleReturn } from '@novel/hooks/async/useToggle';

export default function ExportDialog({ handleToggle, open }: ToggleReturn) {
  return (
    <Dialog open={open} onClose={handleToggle} fullWidth>
      <DialogTitle>导入</DialogTitle>
      <DialogContent>
        <ButtonBase sx={{ width: '100%', height: 200 }}></ButtonBase>
      </DialogContent>
    </Dialog>
  );
}
