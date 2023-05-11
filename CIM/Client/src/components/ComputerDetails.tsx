import React from 'react';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#1A2027',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: '#fff',
}));

const ComputerDetails = () => {

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid>
                        <Item>Service Tag</Item>
                    </Grid>
                    <Grid>
                        <Item>Warranty</Item>
                    </Grid>
                    <Grid>
                        <Item>OU</Item>
                    </Grid>
                    <Grid>
                        <Item>Primary User</Item>
                    </Grid>
                </Grid>
            </Box>
        </>
    )

}

export default ComputerDetails