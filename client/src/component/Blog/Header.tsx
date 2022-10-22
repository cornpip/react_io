import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
// import Link from '@mui/material/Link';
import { Link } from 'react-router-dom'

interface HeaderProps {
  sections: ReadonlyArray<{
    title: string;
    url: string;
  }>;
  title: string;
}

// color="inherit"
// noWrap
// key={section.title}
// variant="body2"
// href={section.url}
// sx={{ p: 1, flexShrink: 0 }}

export default function Header(props: HeaderProps) {
  const { sections, title } = props;

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Button size="medium">Contact</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      >
        {sections.map((section) => (
          <Link
            to={`./${section.title}`}
            key={section.title}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}