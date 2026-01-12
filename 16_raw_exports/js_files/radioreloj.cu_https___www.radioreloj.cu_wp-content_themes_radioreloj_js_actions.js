// Menu Button
const menuDisplayBtn = document.getElementById( "menu-display-btn" );
const mainMenu = document.getElementById( "main-menu" );
const menuCloseBtn = document.getElementById( "close-main-menu" );
let menuIsOpen = false;

menuDisplayBtn.addEventListener( "click", openMenu );
menuCloseBtn.addEventListener( "click", openMenu );

function openMenu(){
    console.log( this.classList )

    if( !menuIsOpen ) {
        // if( this.classList.( "close" ) )
        //     this.classList.remove( "close" );

        console.log( this );
        this.classList.add( "open" );
        mainMenu.classList.add("open");
        menuIsOpen = true;
        console.log( menuIsOpen );
    } else {
        this.classList.remove( "open" );
        this.classList.add( "close" );
        mainMenu.classList.remove("open");
        menuIsOpen = false;
        console.log( menuIsOpen );
    }
}


// SEARCH
const searchContent = document.getElementById( "search-content" );
const searchOpenBtn = document.getElementById( "search-btn" );
const searchCloseBtn = document.getElementById( "search-close-btn" );
let searchIsOpen = false;

searchOpenBtn.addEventListener( "click", openSearchContent );
searchCloseBtn.addEventListener( "click", openSearchContent );

function openSearchContent(){
    if( !searchIsOpen ){
        searchContent.setAttribute( "class", "open" );
        searchIsOpen = true;
    } else {
        searchContent.removeAttribute( "class" );
        searchIsOpen = false;
    }
}
