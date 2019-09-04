const drawerWidth = 200;
const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    // background: 'white',
  },
  drawer: {
    width: drawerWidth,
    // marginTop: '20px',
  },
  drawerPaper: {
    width: drawerWidth,
    '&::-webkit-scrollbar': {
      width: '0px',
    },
    boxShadow:
      '0px 5.5px 5px rgba(0, 0, 0, 0.24), 0px 9px 18px rgba(0, 0, 0, 0.18)',
    borderRight: 'none',
  },
  content: {
    // flexGrow: 1,
    // width: '100%',
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
  active: {
    fontSize: 14,
    backgroundColor: '#e5f6fe',
    color: '#0795db',
    '& $selected': {
      color: '#0795db',
    },
  },
  selected: {},
  listItem: {
    fontSize: 14,
    '&:hover': {
      color: '#03A9F4',
    },
    fontStyle: 'normal',
    fontWeight: 500,
    // lineHeight: 24,
    // height: 65,
  },
  leftAppBar1: {
    textDecoration: 'none',
  },
  leftAppBar: {
    display: 'flex',
    // width: '500px',
    justifyContent: 'flex-end',
    '&:hover': {
      backgroundColor: '#D8D8D8',
      // borderRadius: 10,
    },
  },
  leftAppBarHover: {},
});

export default styles;
