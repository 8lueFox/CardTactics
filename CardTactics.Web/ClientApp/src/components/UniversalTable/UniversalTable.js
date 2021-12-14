import './UniversalTable.css'
import React from 'react'
import { Button, Grid, Paper } from '@mui/material';

export const UniversalTable = (props) => {
    console.log(props)
    return (
        <div id="UniversalTable">
            <Grid xs={12} md={12}>
                <Grid item xs={12} md={12} justifyContent="center">
                    <h1 className="gameName">
                        {props.gameName}
                    </h1>
                </Grid>

                <Grid xs={12} md={12} justifyContent="center">
                    {props.children[0]}
                </Grid>

                <Grid xs={12} md={12} justifyContent="center">
                    {props.children[1]}
                </Grid>

                <Grid xs={12} md={12} justifyContent="center">
                    {props.children[2]}
                </Grid>
            </Grid>
        </div>
    )
}