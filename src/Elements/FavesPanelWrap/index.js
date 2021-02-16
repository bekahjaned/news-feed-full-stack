import styled from 'styled-components';

const media = { desktop: "@media(min-width: 800px)" };

export const FavesPanelWrap = styled.div`
    background-color: #91f0e0;

    div.hide {
        display: none;
    }    

    div.show {
        display: block;
    }

    ${media.desktop} {
        width: 40%;
        height: 100%;
        position: fixed;
        top: 0;
        bottom: 0;
        overflow-y: auto;

        div.show.hide {
            display: flex;
            background-color: #91f0e0;
        }
            
        h2 {
            margin-top: 130px;
            margin-bottom: 0;
        }
    }


`