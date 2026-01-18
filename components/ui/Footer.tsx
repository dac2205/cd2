export default function Footer() {
    return (
        <footer style={{
            backgroundColor: 'hsl(var(--deep-espresso))',
            color: 'hsl(var(--paper-white))',
            padding: '3rem 0',
            marginTop: 'auto'
        }}>
            <div className="container">
                <div style={{ textAlign: 'center' }}>
                    <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>Customer Decode</h4>
                    <p style={{ color: 'hsl(var(--paper-white) / 0.7)', fontSize: '0.875rem' }}>
                        © 2026 Conan School. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
