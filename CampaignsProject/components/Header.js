import { Menu } from 'semantic-ui-react'

const Header = () => (
    <Menu 
        as="header" 
        style={{ marginTop: 10 }}
    >
        <Menu.Item>
        Campaign Coin
        </Menu.Item>


        <Menu.Menu position='right'>
        <Menu.Item>
            Campaigns
        </Menu.Item>

        <Menu.Item>
            +
        </Menu.Item>
        </Menu.Menu>
    </Menu>
)

export default Header;