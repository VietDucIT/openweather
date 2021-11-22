import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom'

import styles from './HomeBtn.module.css';
import './HomeBtn.css';

const HomeBtn = () => {
    return (
        <OverlayTrigger
            placement="right"
            overlay={
                <Tooltip id="home-btn-tooltip">
                    Go Home
                </Tooltip>
            }
        >
            <Link to="/"
                className={`${styles['home-button']} pt-1 ps-2 position-absolute top-0 start-0`}
            >
                <i className="bi bi-house-door-fill text-light" />
            </Link>
        </OverlayTrigger>
    )
}

export default HomeBtn;