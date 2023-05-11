import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Typography } from '@mui/material';
import ComputerDetails from './ComputerDetails';
import ImagingSteps from './ImagingSteps';
import PreviousIssues from './PreviousIssues';

interface ComputerProps {
    name: string;
}

const Computer = (props:ComputerProps) => {
    return (
        <>
            <Accordion>
                <AccordionSummary>
                    <Typography>{props.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <ComputerDetails />
                    <ImagingSteps />
                    <PreviousIssues />
                </AccordionDetails>                
            </Accordion>
        </>
    )
}

export default Computer;