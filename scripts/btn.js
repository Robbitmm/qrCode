let list = [];

function Read(){
    let videoPlayer = document.querySelector('#preview'),
        scanner = new Instascan.Scanner(
        {
            video: videoPlayer,
            mirror: false
        }
    );
    
    videoPlayer.classList.add('active');
    
    scanner.addListener('scan', function(content){
        document.querySelector("#result").value = content;
        Add(content);
        //window.open(content, "_blank");
    });
    
    Instascan.Camera.getCameras().then(cameras => 
    {
        if(cameras.length > 0){
            scanner.start(cameras[0]);
        }else{
            console.error("Não existe câmera no dispositivo!");
        }
    });
}

function Add(newItem){
    list.unshift(newItem);
    //alert(newItem + " foi adicionado com sucesso");

    console.log(list);
    AddtoList(list);
}

function AddtoList(list){
    let ul = document.querySelector('#scanned');
    ul.innerHTML = ""

    for(let i = 0; i < list.length; i++){
        let li = document.createElement('li');
        ul.append(li);

        li.innerHTML = list[i];
    };
}

function Save(){
    let img = document.querySelector('img');

    let imgPath = img.getAttribute('src');
    let fileName = getFileName(imgPath);

    saveAs(imgPath, fileName);

    function getFileName(str){
        return str.substring(str.lastIndexOf('/')+1);
    }
}