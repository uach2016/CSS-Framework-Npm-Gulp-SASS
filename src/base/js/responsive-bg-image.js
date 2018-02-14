(function(){
    var ResponsiveBackgroundImage = function( element ) {
        this.element = element;
        this.img = element.querySelector('img');
        this.src = '';
    
        this.img.addEventListener('load', this.update.bind(this) );
    
        if ( this.img.complete ) {
            this.update();
        }
    };
    
    ResponsiveBackgroundImage.prototype.update = function() {
        var src = typeof this.img.currentSrc !== 'undefined' ? this.img.currentSrc : this.img.src;
        
        if (this.src !== src) {
            this.src = src;
            this.element.style.backgroundImage = 'url("' + this.src + '")';
        }
    }
    
    function init( element ){
        var elements = element.querySelectorAll('[data-responsive-background-image]');
        var elementArray = Array.prototype.slice.call( elements );
        
        if( element.hasAttribute( 'data-responsive-background-image' ) ) {
            elementArray.push( element );
        }
        
        for ( var i=0; i < elementArray.length; i++ ) {  
            new ResponsiveBackgroundImage( elementArray[i] );
        }
    }
    
    init(document.body);
    
    var observer = new MutationObserver(function (e) {
        if ( !e[0].addedNodes ) return;
        
        for ( var i=0; i < e[0].addedNodes.length; i++ ) { 
            if( e[0].addedNodes[i].nodeType === 1 ) {
                init( e[0].addedNodes[i] );
            }
        }        
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
})();
