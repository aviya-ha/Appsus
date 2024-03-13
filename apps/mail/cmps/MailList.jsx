const { Link } = ReactRouterDOM

import { utilService } from "../../../services/util.service.js"
import { MailPreview } from "../cmps/MailPreview.jsx"


export function MailList({ mails, }) {


    return <section>
        <div>Mail list</div>
        <ul className="mails-list ">
            {
                mails.map(mail =>
                    <li key={mail.id}>
                        <input type="checkbox" id="isChecked" name="isChecked" />
                        <input type="checkbox" id="isStared" name="isStared" />
                        <Link to={`/mail/${mail.id}`}>
                            <MailPreview mail={mail} />
                        </Link>
                    </li>)
            }
        </ul>
    </section>
}


// const email = {
//     id: 'e101',
//     subject: 'Miss you!',
//     body: 'Would love to catch up sometimes',
//     isRead: false,
//     sentAt: 1551133930594,
//     removedAt: null,
//     from: 'momo@momo.com',
//     to: 'user@appsus.com'
// }

// import { CarPreview } from "./CarPreview.jsx"


// export function CarList({ cars, onRemoveCar, onUpdateCar }) {

// 	function onChangeSpeed(car) {
// 		car = { ...car, maxSpeed: car.maxSpeed + 10 }
// 		onUpdateCar(car)
// 	}

// 	if (!cars.length) return <div>No cars to show</div>
// 	return <ul className="car-list">
// 		{
// 			cars.map(car => <li key={car.id}>
// 				<Link to={`/car/${car.id}`}>
// 					<CarPreview car={car} />
// 				</Link>
// 				<div className="car-actions">
// 					<button className="remove-btn" onClick={() => onRemoveCar(car.id)}>X</button>
// 					<button onClick={() => { onChangeSpeed(car) }}>Increase speed</button>
// 					<Link to={`/car/edit/${car.id}`}><button>Edit car</button></Link>
// 				</div>
// 			</li>)
// 		}
// 	</ul>
// }
