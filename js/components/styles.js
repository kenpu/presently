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
        },
    },
    segment: {
        largeGap: 100,
        smallGap: 50,
        base: {
            width: "100%",
            display: 'flex',
            flexDirection: 'column',
            marginBottom: 0,
            borderLeft: '2px solid transparent',
            borderTop: '1px solid #888',
            paddingTop: 50,
            paddingBottom: 50,
        },
        label: {
            position: 'absolute',
            top: 0,
            left: 10,
            fontFamily: 'Ubuntu Mono',
            fontWeight: 'bold',
            padding: 5,
        },
        body: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            minHeight: 50,
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
            padding: '5 0 5 10',
        },
        pre: {
            flex: 1,
            lineHeight: '140%',
            fontFamily: 'Ubuntu Mono',
            margin: 0,
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
    image: {
        base: {
            flex: 1,
            borderColor: 'transparent',
            borderWidth: 1,
            borderStyle: 'solid',
        },
        empty: {
            minHeight: '100px',
            textAlign: 'center',
        },
        caption: {
            fontSize: '90%',
        },
    },
    navbar: {
        fontFamily: 'Roboto',
        borderRadius: 0,
    },
    toolSelect: {
        height: 15,
        fontFamily: 'Roboto',
        fontSize: '10px',
        padding: 2,
        border: 'none',
    },
    editor: {
        toggleBtnStyle: {
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 10,
            display: 'block',
            fontFamily: 'Roboto',
            fontWeight: 'bold',
            background: '#000',
            color: '#fff',
            padding: 4,
            opacity: 0.2,
            ":hover": {
                opacity: 1.0,
            },
        },
        indented: {
            marginLeft: 20,
        },
    },
};

module.exports = styles;
