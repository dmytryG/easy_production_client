import styles from './LoadingNotification.module.css';

function LoadingNotification(props) {
    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <div className={styles.loading}>
                <div/>
                <div/>
            </div>
        </div>
    )
}

export default LoadingNotification;