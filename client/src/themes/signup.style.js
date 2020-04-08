exports.authStyle = {
    vh100: {
        height: '100vh'
    },
    div: {
        root: {
            marginTop: 20,
            textAlign: 'center',
            borderTop: 'solid 1px',
            borderColor: '#D3D3D3'
        },
        margin: {
            marginTop: 25
        }
    },
    form: {
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '5rem',
            marginBottom: '5rem'
        },
        error: {
            marginBottom: 20
        },
        title: {
            fontSize: 26,
            marginBottom: 10
        },
        input: {
            width: 340,
            height: 60,
            marginBottom: 3,
            marginTop: 3
        },
        button: {
            marginTop: 35,
            width: 145,
            height: 50,
            color: '#ffffff',
            backgroundColor: '#759CFC',
            "&:hover": {
                background: "#759CFC"
            }
        }
    }
}