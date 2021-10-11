import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Post } from "src/app/shared/interfaces";
import { PostsService } from "src/app/shared/posts.service";
import { AlertService } from "../shared/services/alert.service";

@Component({
  selector: "app-dashboard-page",
  templateUrl: "./dashboard-page.component.html",
  styleUrls: ["./dashboard-page.component.scss"],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  public posts: Post[] = [];
  private pSub: Subscription;
  private dSub: Subscription;
  public searchStr: string = "";

  constructor(
    public postsService: PostsService,
    private alertService: AlertService
    ) {}
  

  ngOnInit() {
    this.pSub = this.postsService.getAll().subscribe((posts) => {
      this.posts = posts;
    });
    console.log(this.posts, "posts");
  }

  removePost(id: string | number) {
    this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
      this.alertService.warning('Post was deleted')
    });
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }
}
