import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../service/News.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class DashboardComponent implements OnInit {

  allNews: any;
  themeOptions = ["Esportes", "Política", "Entretenimento", "Famosos"];
  selectedTheme: any;
  selectedNews: any = {
    img_url: "",
    title: "",
    description: "",
    theme: "",
    link: "",
    id: "",
    update: true
  };

  constructor(config: NgbModalConfig, private modalService: NgbModal, private news : NewsService) {
    config.backdrop = 'static';
    config.keyboard = false;
   }

  ngOnInit(): void {
  }

  createNewsByModal():void{
    this.createNews(this.selectedNews.img_url, this.selectedNews.title, this.selectedNews.description, this.selectedNews.theme, this.selectedNews.link);
  }

  createNews(img_url : string, title : string, description : string, theme : string, link : string) : void {
    this.news.createNews(img_url, title, description, theme, link).subscribe(
      data => {
        alert("Success");
        this.getNewsByTheme(this.selectedTheme);
      },
      err => {
        console.log(err);
      }
    )
  }

  getNewsByTheme(theme : string): void {
    this.selectedTheme = theme;
    this.news.getNewsByTheme(theme).subscribe(
      data => {
        this.allNews = data.news;
      },
      err => {
        console.log(err);
      }
    )
  }

  deleteNewsById(id:string) : void {
    this.news.deleteNews(id).subscribe(
      data => {
        alert(data.msg);
        this.getNewsByTheme(this.selectedTheme);
      },
      err => {
        console.log(err);
      }
    )
  }

  updateNewsById() : void {
    this.news.updateNews(this.selectedNews.img_url, this.selectedNews.title, this.selectedNews.description, this.selectedNews.theme, this.selectedNews.link, this.selectedNews.id).subscribe(
      data => {
        if (data.msg.nModified == 1)
          alert("Success");
          this.getNewsByTheme(this.selectedTheme);
      },
      err => {
        console.log(err);
      }
    )
  }

  openModal(content:any) {
    this.modalService.open(content);
  }
  
  updateSelectedNews(news:any){
    this.selectedNews.img_url = news.img_url;
    this.selectedNews.title = news.title;
    this.selectedNews.description = news.description;
    this.selectedNews.theme = news.theme;
    this.selectedNews.link = news.link;
    this.selectedNews.id = news._id;
    this.selectedNews.update = true;
  }
}
