import './Table.css'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getStartingHandBlackJack } from './backend.js'
import { styled } from '@mui/material/styles';
import { Button, Grid, Paper } from '@mui/material';
import Cards from './Cards'

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: 'transparent',
    boxShadow: 'none'
}));

const Table = ({ blackJackTable, getStartingTable }) => {
    useEffect(() => {
        getStartingTable()
    })
    console.log(blackJackTable)
    var card = Cards.find(c => c.id = "AH");
    console.log(card)
    console.log(Cards)
    return (
        <div id="TableContainer">
            <div className="CardsContainer">
                <Grid container spacing={6}>
                    <Grid item xs={4} md={3}></Grid>
                    <Grid item xs={6} md={6} id="GridCroupierCards">
                        <Grid md={2}>
                            <Item>
                                <img src={card.img} width='100px' />
                            </Item>
                        </Grid>
                        <Grid md={2}>
                            <Item>
                                <img src={card.img} width='100px' />
                            </Item>
                        </Grid>
                    </Grid>
                    <Grid item xs={4} md={3}></Grid>
                    <Grid item xs={4} md={3}></Grid>
                    <Grid item xs={6} md={6} id="GridCroupierCards">
                        <Grid md={2}>
                            <Item>
                                <img src={card.img} width='100px' />
                            </Item>
                        </Grid>
                        <Grid md={2}>
                            <Item>
                                <img src={Cards.find(c => c.id = "reverse")} width='100px' />
                            </Item>
                        </Grid>
                    </Grid>
                    <Grid item xs={4} md={3}></Grid>
                </Grid>
            </div>
            <div className="ButtonContainer">
                <Grid container spacing={2}>
                    <Grid item xs={4} md={3}></Grid>
                    <Grid xs={4} md={6} id="GridButtons">
                        <Grid md={2}>
                            <Item>
                                <Button variant="outlined" color="primary">HIT</Button>
                            </Item>
                        </Grid>
                        <Grid md={2}>
                            <Item>
                                <Button variant="outlined" color="secondary">STAND</Button>
                            </Item>
                        </Grid>
                        <Grid md={2}>
                            <Item>
                                <Button variant="outlined" color="info">DOUBLE DOWN</Button>
                            </Item>
                        </Grid>
                        <Grid md={2}>
                            <Item>
                                <Button variant="outlined" color="error">SPLIT</Button>
                            </Item>
                        </Grid>
                        <Grid md={2}>
                            <Item>
                                <Button variant="outlined" color="warning">INSURANCE</Button>
                            </Item>
                        </Grid>
                    </Grid>
                    <Grid item xs={4} md={3}></Grid>
                </Grid>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    blackJackTable: state.blackJackTable
})

const mapDisptachToProps = dispatch => ({
    getStartingTable: () => dispatch(getStartingHandBlackJack())
})

export default connect(
    mapStateToProps, mapDisptachToProps
)(Table)