var C = require('../constants');

var styles = {
    borderColor: '#aaa',
    borderHLColor: '#f00',
    bgHLColor: '#eee',
    article: {
        header: {
            background: '#000',
            color: '#fff',
            minHeight: 20,
            fontSize: '200%',
            textAlign: 'center',
            padding: 20,
        },
    },
    section: {
        base: {
            width: '100%',
            marginBottom: 50,
        },
    },
    segment: {
        base: {
            width: "100%",
            display: 'flex',
            flexDirection: 'column',
            marginBottom: 0,
            paddingLeft: 50,
            position: 'relative',
            borderLeft: '2px solid transparent',
            borderTop: '1px solid #888',
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
            flexDirection: 'column',
            display: 'flex',
        },
        sidenote: {
            flex: 1,
            background: '#eee',
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
            marginLeft: 10,
            marginRight: 10,
            marginTop: 10,
            marginBottom: 10,
            minHeight: 50,
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
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        minHeight: 50,
    },
    html: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        minHeight: 50,
    },
    navbar: {
        fontFamily: 'Roboto',
    },
    toolSelect: {
        height: 15,
        fontFamily: 'Roboto',
        fontSize: '10px',
        padding: 2,
        border: 'none',
    },
};

module.exports = styles;
