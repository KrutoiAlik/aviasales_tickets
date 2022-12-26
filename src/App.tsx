import React, {ChangeEvent, useState} from 'react';
import './App.css';
import './components/Checkbox/Checkbox.css';
import logo from './airplane.png';
import data from './tickets.json';
import {Ticket, TicketCard} from "./components/TicketCard/TicketCard";

const CURRENCY = new Map<string, string>([['RUB', '₽'], ['USD', '$'], ['EUR', '€']]);

function App() {

    const [currency, setCurrency] = useState<string>('RUB');
    const [sortedBy, setSortedBy] = useState<string>('price'); // in case to sort tickets by other fields
    const [stopFilters, setStopFilters] = useState<number[]>([]);

    const sortTickets = (ticket1: Ticket, ticket2: Ticket) => {
        const value1 = ticket1[sortedBy];
        const value2 = ticket2[sortedBy];

        if (value1 === value2) {
            return 0;
        }

        if (value1 < value2) {
            return -1;
        }

        return 1;
    }

    const tickets = !stopFilters.length
        ? [...data.tickets]
        : data.tickets.filter(ticket => stopFilters.includes(ticket.stops));

    tickets.sort(sortTickets);
    const stopsMessage = (stops: number) => {
        if (stops === 1) {
            return `${stops} пересадка`;
        } else if (stops === 0) {
            return 'Без пересадок';
        } else if ([2, 3, 4].includes(stops % 10)) {
            return `${stops} пересадки`;
        }

        return `${stops} пересадок`;
    }

    const updateStopFilters = (e: ChangeEvent<HTMLInputElement>) => {

        if (e.target.checked) {
            setStopFilters(prev => [...prev, +e.target.value]);
        } else {
            setStopFilters(prev => prev.filter(filter => filter !== +e.target.value));
        }
    }

    const getStopsOptions = () => {

        const allStops = Array.from(new Set(data.tickets.map(ticket => ticket.stops))).sort();

        const stopOptions: JSX.Element[] = [
            <div className='stops-option'>
                <div>
                    <input id='allStops'
                           className='checkbox'
                           checked={!stopFilters.length}
                           type='checkbox'
                           onChange={(e) => setStopFilters([])}/>
                    <label htmlFor='allStops'>Все</label>
                </div>
                <div>
                    <span className='only-this-option__btn'>ТОЛЬКО</span>
                </div>
            </div>
        ];

        allStops.forEach(stops => {
            stopOptions.push(<div className='stops-option'>
                <div>
                    <input id={`stops_${stops}`}
                           className='checkbox'
                           value={stops}
                           checked={stopFilters.includes(stops)}
                           type='checkbox' onChange={updateStopFilters}/>
                    <label htmlFor={`stops_${stops}`}>{stopsMessage(stops)}</label>
                </div>
                <div>
                    <span className='only-this-option__btn'
                          onClick={(e) => setStopFilters([stops])}>ТОЛЬКО</span>
                </div>
            </div>);
        })

        return stopOptions;
    }

    const getTicketElements = (): JSX.Element[] => {
        return tickets.map((ticket, index) => (<TicketCard key={`ticket_${index}`}
                                                           ticket={ticket}
                                                           stops={stopsMessage(ticket.stops)}
                                                           currency={CURRENCY.get(currency) || ''}/>));
    }

    const changeCurrency = (e: any) => {
        if (currency === e.target.innerHTML) {
            return;
        }

        setCurrency(e.target.innerHTML);
    }

    const getCurrencyButtons = () => {
        return Array.from(CURRENCY.keys()).map(key => (
                <button className={`currency-btn ${currency === key ? 'selected' : ''}`}
                        onClick={changeCurrency}>{key}</button>
            )
        );
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} width='50' height='50' alt={'logo'}/>
            </header>

            <section className='App-content'>
                <div className="options-sidebar">
                    <div className="currency-options">
                        <h3 className='sidebar-header'>Валюта</h3>
                        <div className="currency-btn-group">
                            {getCurrencyButtons()}
                        </div>
                    </div>
                    <div className="stops-options">
                        <h3 className='sidebar-header'>Количество пересадок</h3>
                        <form>
                            {getStopsOptions()}
                        </form>
                    </div>
                </div>
                <div className="tickets">
                    {getTicketElements()}
                </div>
            </section>
        </div>
    );
}

export default App;
