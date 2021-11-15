import { Link } from  "react-router-dom";

import styles from './PageNotFound.module.css';

const PageNotFound = () => {
    return (
        <div className={`${styles.box} text-center py-5`}>
            <div className={`${styles['error-name']} fw-bold`}>
                <p className={`${styles['error-code']} mb-0`}>
                    4<i class="bi bi-emoji-frown"></i>4
                </p>
                <p className={styles['error-description']}>
                    Page Not Found
                </p>
            </div>
            
            <p className={`${styles['error-detail']} mb-5`}>
                There're no information for this city. Please search another city.
            </p>

            <Link to="/" className={styles['error-back']}>
                Quay lại
            </Link>
        </div>
    )
}

export default PageNotFound;