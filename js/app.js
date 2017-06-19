$(document).ready(function(){
    `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=`
    let userInput;
    $('#searchButton').click(function(){
        userInput = $('#userInput').val();
        $.ajax({
            url:`https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=${userInput}`,
            success: function(response){
                $('#modal').css('display','block');
                $('.search-title').text(`Articles for ${userInput}`);
                let listOfArticles = response.query.pages;
                console.log(response);
                $.map(listOfArticles,function(article,i){
                        let title = article.title;
                        let des = article.extract;
                        let idlink = article.pageid;
                        let link = `https://en.wikipedia.org/?curid=${idlink}`;
                        listGenerator(title,des,link);
                });
                // for (let i = 0; i < listOfArticles.length; i++){
                //
                //
                // };
            },
            dataType: 'jsonp',
            type: 'GET'
        })
    })//end of search button


    $('#close-icon').click(function(){
       $('#modal').css('display',"none");
    });

    function listGenerator(title,des, link){
        let newItem = ` 
                            <li class="list-items">
                               <a href = '${link}'> <h3>${title}</h3></a>
                                <p> ${des}</p>
                            </li>
                        `;
        $('.link-list').append(newItem);
    };






});