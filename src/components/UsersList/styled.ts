import { styled } from 'theme';
import { Link as MuiLink } from '@material-ui/core';

export const Link = styled(MuiLink)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
` as typeof MuiLink;
