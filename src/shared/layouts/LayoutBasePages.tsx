
import { IconButton, Typography, useTheme, Icon, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import MenuIcon from '@mui/icons-material/Menu';
import { useDrawerContext } from "../contexts";
import { ReactNode } from "react";


interface ILayoutBasePagesProps {
//   titlePage: string;
  barraDeFerrementas?: React.ReactNode;
  children: React.ReactNode;
} 

export const LayoutBasePages: React.FC<ILayoutBasePagesProps> = ({  children, barraDeFerrementas }): JSX.Element => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('sm'));


    const { toggleDrawerOpen } = useDrawerContext();

    return (
        <Box>
           {barraDeFerrementas &&  (
             <Box>
                {barraDeFerrementas}
             </Box>
            )}

            <Box flex={1} overflow={"auto"}>
                {children}
            </Box>
        </Box>

    );

};