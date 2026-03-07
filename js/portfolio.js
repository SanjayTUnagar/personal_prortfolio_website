
class Portfolio {

    constructor(tabs) {
        this.bindEvents();
        this.tabs = tabs;
        for(const tab of tabs){
            this.loadData(tab);
        }

        setTimeout(()=>{
            $('#loader').addClass("hide");
            $('#posts').removeClass("hide");
        }, 1000);

        return this;

    }

    bindEvents(){

        $('.connect, .cross').on('click',()=>{
            $('#connectSection').toggleClass("hide");
            $('#icon-connect').toggleClass("fa-minus-circle");
            $('#icon-connect').toggleClass("fa-plus-circle");
            $('.connect').toggleClass("active");
            
        });

    }

    loadData(tab){
        fetch(`./data/${tab}.json`)
        .then((resp) => resp.json())
        .then((data)=> {
            this.showData(data, tab);
        })
        .catch(function(err) {
            console.log(err);
        });
    }

    showData(posts, tab){
        for(const post of posts){
            $(`#${tab}`).append(this.getPost(post));
        }
    }

    getPost(post){
        let html = `
            <div class="post-container">
                <div class="post-header">
                    <div class="post-header-top heading">
                        ${post.postHeadingLeft}
                    </div>
                    <div class="post-header-top">
                        ${post.postHeadingRight}
                    </div>
                </div>
                <div>
                    <div class="headline-container">
            
                    </div>
                    <div class="headline-content">
                        <p ng-bind-html="post.postBody">
                            ${post.postBody}
                        </p>
                    </div>
                </div>
                <div class="post-footer">
                    <div class="post-footer-container">
                        <div class="left-side">
                            <p>${post.postFooterLeft}</p>
                        </div>
                        <div class="right-side">
                            <p>${post.postFooterRight}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        return html;
    }


    openTab(event, tabName) {

        $('#loader').removeClass("hide");
        $('#posts').addClass("hide");

        setTimeout(()=>{
            $('#loader').addClass("hide");
            $('#posts').removeClass("hide");
        }, 500);

        let tabcontent, tablinks;

        $('.tabcontent').removeClass("show");
        $(`#${tabName}`).addClass("show");

        tablinks = document.getElementsByClassName("menu-item");
        for (let i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        event.currentTarget.className += " active";
    }

    sticky_relocate() {
        let window_top = $(window).scrollTop();
        let div_top = $('#sticky-anchor').offset().top;
        let div_top_right = $('#sticky-anchor-right').offset().top;
        let div_menu = $('#sticky-anchor-menu').offset().top;
        if (window_top > div_top) {
            $('#sticky').addClass('stick');
            $('#sticky-anchor').height($('#sticky').outerHeight());
        } else {
            $('#sticky').removeClass('stick');
            $('#sticky-anchor').height(0);
        }
        
        if (window_top > div_top_right) {
            $('#sticky-right').addClass('stick');
            $('#sticky-anchor-right').height($('#sticky-right').outerHeight());
        } else {
            $('#sticky-right').removeClass('stick');
            $('#sticky-anchor-right').height(0);
        }
    
        if (window_top > div_menu) {
            $('#sticky-menu').addClass('stick-menu');
            $('#sticky-anchor-menu').height($('#sticky-menu').outerHeight());
        } else {
            $('#sticky-menu').removeClass('stick-menu');
            $('#sticky-anchor-menu').height(0);
        }
    }

}