export const color = {
    c1: '#dadada',
    c2: '#0e7eda',
    c3: '#b0b0b0',
    c4: 'white',
};

export const size = {
    sz1: `2px`,
    sz2: `4px`,
    sz3: `6px`,
    sz4: `8px`,
    sz5: '14px',
    sz6: '22px',
    sz7: '36px',
    sz8: '80px',
}


export const flex = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: `${size.sz6}`,
};

export const dynamicWidth = {
    minWidth: 360,
    maxWidth: 720,
    width: "100%",
    margin: "0 auto",
}

export const shadow = {
    boxShadow: `0 ${size.sz3} ${size.sz4} ${color.c1}`,
};

export const borderB = {
    borderBottom: `solid 0.5px ${color.c1}`,
};

export const borderT = {
    borderTop: `solid 0.5px ${color.c1}`,
};

export const styleInitial = {
    fontSize: '1.7em',
    fontWeight: 'bold',
    display: 'inline-block',
    border: `double ${size.sz2}`,
    borderRadius: size.sz4,
    padding: `${size.sz1} ${size.sz4}`,
    textShadow: `2px 2px 2px ${color.c1}`,
};

export const listStyle = {
    padding: `${size.sz6} ${size.sz4} ${size.sz2}`,
    listStyle: "none",
    borderBottom: `solid 1px ${color.c1}`,
    fontStyle: "italic",
}