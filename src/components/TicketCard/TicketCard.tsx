import React, {FunctionComponent} from 'react';
import './TicketCard.css';
import logo from '../../turkish_airlines.png';

interface IIndexAble {
    [key: string]: string | number;
}

export type Ticket = IIndexAble & {
    origin: string,
    origin_name: string,
    destination: string,
    destination_name: string,
    departure_date: string,
    departure_time: string,
    arrival_date: string,
    arrival_time: string,
    carrier: string,
    stops: number,
    price: number
}

type TicketCardProps = {
    ticket: Ticket,
    currency: string,
    stops: string
}

export const TicketCard: FunctionComponent<TicketCardProps> = (props) => {

    const dateString = (value: string) => {

        const dateParts = value.split('.');

        if(dateParts.length < 3){
            throw new Error(`Incorrect date format: ${value}`);
        }

        // as IE doesn't support DD.MM.YY format, date is split into three pieces
        let str = new Date(+('20' + dateParts[2]), +dateParts[1] - 1, +dateParts[0])
            .toLocaleDateString('ru-RU', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                }
            );

        str = str[0].toUpperCase() + str.slice(1);

        return str.replace(/\.|г/g, '').trim().split(', ').reverse().join(', ');
    }

    return (<div className="ticket">
        <div className="ticket__purchase">
            <div style={{paddingLeft: 10, paddingRight: 10}}>
                <img src={logo} height={'40'} alt={'logo'}/>
            </div>
            <button className={'btn'}>Купить <br/>за {props.ticket.price}{props.currency}</button>
        </div>
        <div className="ticket__details">
            <div className="ticket__duration">
                <span className="ticket__time">{props.ticket.departure_time}</span>

                <span className="ticket__stops">
                    <span>{props.stops}</span>
                    <div className='stops-line'></div>
                </span>

                <span className="ticket__time">{props.ticket.arrival_time}</span>
            </div>

            <div className="destinations">
                <div className="destination__details">
                    <span className="destination__name">
                        {props.ticket.origin}, {props.ticket.origin_name}
                    </span>
                    <span className='destination__date'>{dateString(props.ticket.departure_date)}</span>
                </div>
                <div className='destination__details text-align__right'>
                    <span className="destination__name">
                        {props.ticket.destination_name}, {props.ticket.destination}
                    </span>
                    <span className='destination__date'>{dateString(props.ticket.arrival_date)}</span>
                </div>
            </div>
        </div>
    </div>);
}