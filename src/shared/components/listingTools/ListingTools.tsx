import { Avatar, Box, Button, Icon, IconButton, MenuItem, Paper, TextField, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useDrawerContext } from "../../contexts";
import MenuIcon from '@mui/icons-material/Menu';
import {
    Help, HelpCenterOutlined, HelpOutlineOutlined, HelpSharp, Login, LoginOutlined,
    LogoDev, NotificationAddSharp, NotificationImportantOutlined, NotificationsActiveOutlined,
    NotificationsActiveSharp, NotificationsNoneOutlined, AccountCircleOutlined
} from "@mui/icons-material";
import { IUserReducer } from '../../../store/reducers/interfaces';
import { UserActions } from '../../../store/reducers/userReducer'

interface IListingToolsProps {
    titlePage: string;

}

export const ListingTools: React.FC<IListingToolsProps> = ({ titlePage }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const user = useSelector((state: any): IUserReducer => state.UserReducer);
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    const { toggleDrawerOpen } = useDrawerContext();

    const logout = () => {
        dispatch(UserActions.logout());
        navigate('/');
    }

    return (
        <Box
            component={Paper}
            gap={1}
            //marginX={1}
            padding={1}
            display={"flex"}
            alignItems={"center"}
            height={theme.spacing(7)}
        >

            <Box
                padding={4}
                display="flex"
                alignItems={"center"}
                height={theme.spacing(smDown ? 8 : mdDown ? 9 : 10)}
            >
                {smDown && (
                    <IconButton onClick={toggleDrawerOpen}>
                        <MenuIcon />
                    </IconButton>
                )}

                <Typography
                    variant={smDown ? 'h4' : mdDown ? 'h5' : 'h5'}
                    whiteSpace={"normal"}
                    overflow={"hidden"}
                    textOverflow={"ellipsis"}
                >
                    {titlePage}
                </Typography>
            </Box>

            <Box
                flex={1}
                gap={'1em'}
                display={"flex"}
                justifyContent={"end"}
                alignItems={"center"}
                height={theme.spacing(5)}
                color={"#505050"}
                paddingRight={'40px'}
            >
                <NotificationsNoneOutlined />
                <HelpOutlineOutlined />
                <AccountCircleOutlined /><span style={{ fontFamily: 'Montserrat', marginLeft: '-10px' }}>Olá, cliente</span>
                {/* <Avatar
                    // src="https://static.shiftpagamentos.com.br/web/group3.png"
                    alt="Remy Sharp"
                    sx={{ width: 26, height: 26 }}
                >
                </Avatar> */}
                <LoginOutlined onClick={logout} style={{ cursor: 'pointer' }} />
            </Box>

        </Box>
    );
};