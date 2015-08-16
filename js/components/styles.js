var C = require('../constants');

var styles = {
    borderColor: '#aaa',
    borderHLColor: '#f00',
    bgHLColor: '#eee',
    section: {
        base: {
            width: '100%',
            marginBottom: 50,
        },
        header: {
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 10,
            maxWidth: '80%',
            padding: 10,
        },
    },
    segment: {
        base: {
            width: "100%",
            display: 'flex',
            flexDirection: 'column',
            marginTop: 20,
            marginBottom: 0,
            paddingLeft: 50,
            position: 'relative',
            borderLeft: '2px solid transparent',
        },
        label: {
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 0,
            fontFamily: 'Ubuntu Mono',
            fontWeight: 'bold',
            padding: 5,
            width: 50,
            textAlign: 'center',
        },
        body: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            minHeight: 200,
        },
        content: {
            flex: 4,
            display: 'flex',
        },
        sidenote: {
            flex: 1,
        }
    },
    box: {
        base: {
            display: "flex",
            flex: 1,
            minHeight: 20,
        },
    },
    codewalk: {
        base: {
            flex: 1,
        },
        section: {
            width: '100%',
            display: 'flex',
        },
        side: {
            maxWidth: '30%',
            minWidth: '30%',
        },
        code: {
            flex: 1,
            lineHeight: '140%',
            fontFamily: 'Ubuntu Mono',
        }
    },
    markdown: {
        flex: 1,
        margin: 10,
    },
    html: {
        flex: 1,
        margin: 10,
    },
};

module.exports = styles;
