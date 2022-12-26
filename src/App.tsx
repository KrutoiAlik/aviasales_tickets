import React, {ChangeEvent, useState} from 'react';
import './App.css';
import './components/Checkbox/Checkbox.css';
import logo from './airplane.png';
import data from './tickets.json';
import {Ticket, TicketCard} from "./components/TicketCard/TicketCard";
import {FilterSidebar} from "./components/FilterSidebar/FilterSidebar";

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
    const getStopsLabel = (stops: number) => {
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

    const getTicketElements = (): JSX.Element[] => {
        return tickets.map((ticket, index) => (<TicketCard key={`ticket_${index}`}
                                                           ticket={ticket}
                                                           stops={getStopsLabel(ticket.stops)}
                                                           currency={CURRENCY.get(currency) || ''}/>));
    }

    const changeCurrency = (e: React.MouseEvent) => {
        if (currency === e.currentTarget.innerHTML) {
            return;
        }

        setCurrency(e.currentTarget.innerHTML);
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} width='50' height='50' alt={'logo'}/>
            </header>

            <section className='App-content'>

                <FilterSidebar currency={currency}
                               changeCurrency={changeCurrency}
                               stopFilters={stopFilters}
                               setStopFilters={setStopFilters}
                               generateStopsLabel={getStopsLabel}
                               updateStopFilters={updateStopFilters}/>

                <div className="tickets">
                    {getTicketElements()}
                </div>
            </section>
        </div>
    );
}

export default App;
