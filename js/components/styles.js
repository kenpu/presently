var C = require('../constants');

var readingScreen = "@media (max-width: 1024px)";
var largeScreen = "@media (min-width: 1200px)";
var tabletScreen = "@media (min-width: 768px) and (max-width: 979px)";

var inverted = {
    background: "#888",
    color: "#fff",
}

var styles = {
    borderColor: '#aaa',
    borderHLColor: '#f00',
    bgHLColor: '#eee',
    article: {
        header: {
            minHeight: 20,
            fontSize: '300%',
            textAlign: 'center',
            padding: 20,
            borderBottom: "1px solid black",
            background: inverted.background,
            color: inverted.color,
            "@media print": {
                background: 'transparent',
                color: 'black',
                fontSize: '200%',
            },
        },
    },
    section: {
        base: {
            width: '100%',
        },
        emptyInEditor: {
            height: 100,
            background: "#eee",
        },
        selected: {
            borderLeft: "5px solid #00f",
        },
        title: {
            width: '100%',
            background: inverted.background,
            color: inverted.color,
            fontSize: "250%",
            fontStyle: 'italic',
            textAlign: 'right',
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 20,
            paddingRight: 50,
            minHeight: 20,
            "@media print": {
                background: 'transparent',
                color: 'black',
                fontSize: '140%',
            },
        },
        titleLabel: {
            fontWeight: '800',
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            marginRight: 20,
        },
    },
    segment: {
        gap: 100,
        base: {
            width: "100%",
            display: 'flex',
            flexDirection: 'column',
            marginBottom: 0,
            borderLeft: '5px solid transparent',
            borderTop: '1px solid #888',
        },
        selected: {
            borderLeft: '5px solid red',
        },
        label: {
            position: 'absolute',
            top: 5,
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
            fontSize: '90%',
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
        "@media print": { minHeight: 10, },
    },
    html: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        minHeight: 50,
        "@media print": { minHeight: 10, },
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
        saved: {
            color: "#8a8",
        },
        modified: {
            color: "#a88",
        },
        source: {
            fontFamily: 'Ubuntu Mono',
            fontSize: 12,
        },
    },
    navbar: {
        progressbar: {
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            height: 10,
            zIndex: 2000,
        },
        indicator: {
            width: '100%',
            height: 5,
            background: 'red',
        },
        menu: {
            borderRadius: 0,
            marginBottom: 0,
        },
        base: {
            fontFamily: "Roboto",
        }
    },
};

// Responsive design
styles.segment.label[readingScreen] = {
    position: 'relative',
};

module.exports = styles;
