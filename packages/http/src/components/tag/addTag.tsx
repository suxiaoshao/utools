import React from 'react';
import { CardActions, IconButton, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';
import { TagEntity } from '@http/database/entity/tag.entity';
import { match } from 'ts-pattern';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 用于添加一个 tag
 * */
export default function AddTag() {
  const [name, setName] = React.useState<string>('');
  return (
    <CardActions sx={{ display: 'flex' }}>
      <TextField
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
        label="新标签名"
        error={name === ''}
        sx={{ flex: '1 1 0' }}
        helperText={match(name)
          .with('', () => '标签名不可为空')
          .otherwise(() => undefined)}
      />
      <IconButton
        color="primary"
        onClick={async () => {
          const tagEntity = new TagEntity(null, name);
          await tagEntity.save();
          setName('');
        }}
        disabled={name === ''}
      >
        <Add />
      </IconButton>
    </CardActions>
  );
}
