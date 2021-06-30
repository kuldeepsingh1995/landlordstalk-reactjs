import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function CircularProgressWithLabel(props) {

    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress variant="determinate" {...props} />
            <div className={"empty-bar"} style={{borderWidth:`${Number(props.thickness) + 1}px`}}></div>
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="caption" style={props.font?{fontSize:`${props.font}px`}:{}} className={"progress-value"} component="div" color="textSecondary">{props.text}</Typography>
            </Box>
        </Box>
    );
}



export default function CircularStatic(props) {
    const [progress, setProgress] = React.useState(props.value);
    return <CircularProgressWithLabel {...props} value={progress} />;
}
