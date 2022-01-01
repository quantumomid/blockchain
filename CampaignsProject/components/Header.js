import { Menu } from 'semantic-ui-react'
import Link from 'next/link'

const Header = () => (
    <Menu 
        as="header" 
        style={{ marginTop: 10 }}
        inverted
    >
        <Menu.Item >
            <Link href="/"><a>Campaign Coin</a></Link>
        </Menu.Item>


        <Menu.Menu position='right'>
        <Menu.Item >
            <Link href="/"><a>Campaigns</a></Link>
        </Menu.Item>

        <Menu.Item >
            <Link href="/campaigns/new"><a>+</a></Link>
        </Menu.Item>
        </Menu.Menu>
    </Menu>
)

export default Header;