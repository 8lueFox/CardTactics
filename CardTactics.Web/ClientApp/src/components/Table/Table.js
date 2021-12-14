import './Table.css'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getStartingHandBlackJack, getNextCardForPlayer, getNextCardForCroupier } from './backend.js'
import { styled } from '@mui/material/styles';
import { Button, Grid, Paper } from '@mui/material';
import { UniversalTable } from './../UniversalTable/UniversalTable'

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: 'transparent',
    boxShadow: 'none'
}));

const Table = ({ blackJackTable, isRequestForNewCardForCroupierIsSended, isRequestForNewTable, getStartingTable, getNextCardForPlayer, getNextCardForCroupier }) => {
    const [standOption, setStandOption] = useState(false)
    const [isStartingTableIsFetching, setIsStartinTableIsFetching] = useState(false)
    const [isUserOver21, setIsUserOver21] = useState(false)
    const [oldTable, setOldTable] = useState()
    useEffect(() => {
        getStartingTable()
    }, [])

    const getNextCard = () => {
        getNextCardForPlayer(blackJackTable)
    }

    const standOptionClicked = () => {
        setStandOption(true)
        checkCroupierCards()
    }

    const checkCroupierCards = () => {
        if (blackJackTable.croupierSum < 17 && !isRequestForNewCardForCroupierIsSended && !isStartingTableIsFetching && !isUserOver21) {
            getNextCardForCroupier(blackJackTable)
        } else if (!isStartingTableIsFetching && !isRequestForNewCardForCroupierIsSended && !isUserOver21 && !isRequestForNewTable) {
            setIsStartinTableIsFetching(true)
            setTimeout(() => {
                setStandOption(false)
                setIsStartinTableIsFetching(false)
                getStartingTable()
            }, 3000)
        }
    }

    const checkPlayerCards = () => {
        if (blackJackTable.playerSum > 21 && !isStartingTableIsFetching && !isRequestForNewTable && oldTable != blackJackTable) {
            setOldTable(blackJackTable)
            setIsStartinTableIsFetching(true)
            setStandOption(true)
            setIsUserOver21(true)
            setTimeout(() => {
                setStandOption(false)
                setIsUserOver21(false)
                setIsStartinTableIsFetching(false)
                getStartingTable()
            }, 3000)
        }
    }

    return (
        <div>
            {standOption && checkCroupierCards()}
            {!standOption && !isStartingTableIsFetching && checkPlayerCards()}
            <UniversalTable gameName="BlackJack">
                <Grid item xs={12} md={12} id="GridCroupierCards">
                    <Grid xs={12} md={1}>
                        {
                            blackJackTable.croupier.length != 0 ?
                            standOption ? "Croupier's card value: " + blackJackTable.croupierSum.toString() : "Croupier's card value: " + (blackJackTable.croupierSum - (blackJackTable.croupier[0].rank <= 10 ? blackJackTable.croupier[0].rank : 10)).toString()
                            : ''
                        }
                    </Grid>
                    <Grid xs={12} md={10} justifyContent="center" style={{ display: 'flex' }}>
                        {blackJackTable.croupier.map((c, index) => (
                            <Grid xs={2} md={1} key={index}>
                                <Item>
                                    {index === 0 && blackJackTable.croupier.length === 2 && standOption == false ?
                                        <img src={'cards/purple_back.png'} width="100%" alt="Back of card" /> :
                                        resolveCardToImg(c)
                                    }
                                </Item>
                            </Grid>
                        ))}
                    </Grid>
                    <Grid xs={12} md={1}></Grid>
                </Grid>
                <Grid item xs={12} md={12} id="GridCroupierCards">
                    {blackJackTable.player.map((c, index) => (
                        <Grid xs={6} md={1} key={index}>
                            <Item>
                                {resolveCardToImg(c)}
                            </Item>
                        </Grid>
                    ))}
                </Grid>
                <Grid xs={12} md={12} id="GridButtons">
                    <Grid xs={4} md={1}>
                        <Item>
                            <Button variant="outlined" color="primary" onClick={getNextCard} disabled={standOption}>HIT</Button>
                        </Item>
                    </Grid>
                    <Grid xs={4} md={1}>
                        <Item>
                            <Button variant="outlined" color="secondary" onClick={standOptionClicked} disabled={standOption}>STAND</Button>
                        </Item>
                    </Grid>
                    <Grid xs={4} md={1}>
                        <Item>
                            <Button variant="outlined" color="info" disabled={standOption}>DOUBLE DOWN</Button>
                        </Item>
                    </Grid>
                    <Grid xs={3} md={1}>
                        <Item>
                            <Button variant="outlined" color="error" disabled={standOption}>SPLIT</Button>
                        </Item>
                    </Grid>
                    <Grid xs={3} md={1}>
                        <Item>
                            <Button variant="outlined" color="warning" disabled={standOption}>INSURANCE</Button>
                        </Item>
                    </Grid>
                </Grid>
            </UniversalTable>
        </div>
    )
}

const resolveCardToImg = (card) => {
    var rank, figure;
    if (card.rank <= 10) {
        rank = card.rank
    } else {
        switch (card.rank) {
            case 11:
                rank = 'J'
                break
            case 12:
                rank = 'Q'
                break
            case 13:
                rank = 'K'
                break
            case 14:
                rank = 'A'
                break
        }
    }
    switch (card.figure) {
        case 0:
            figure = 'C'
            break
        case 1:
            figure = 'D'
            break
        case 2:
            figure = 'H'
            break
        case 3:
            figure = 'S'
            break
    }
    return <img src={'cards/' + rank + figure + '.png'} width="100%" alt={"card " + rank + " " + figure} />
}

const mapStateToProps = (state) => ({
    blackJackTable: state.blackJack.blackJackTable,
    isRequestForNewCardForCroupierIsSended: state.blackJack.isRequestForNewCardForCroupierIsSended,
    isRequestForNewTable: state.isRequestForNewTable
})

const mapDisptachToProps = dispatch => {
    return {
        getStartingTable: () => dispatch(getStartingHandBlackJack()),
        getNextCardForPlayer: (table) => dispatch(getNextCardForPlayer(table)),
        getNextCardForCroupier: (table) => dispatch(getNextCardForCroupier(table))
    }
}

export default connect(
    mapStateToProps, mapDisptachToProps
)(Table)