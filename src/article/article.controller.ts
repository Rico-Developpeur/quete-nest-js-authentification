import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ArticleService } from './article.service';
import { Article } from './article.entity';

@Controller('article')
export class ArticleController {
  constructor(private service: ArticleService) {}

  @Get()
  getAll() {
    return this.service.getAllArticle();
  }

  @Get(':id')
  get(@Param() params) {
    return this.service.getArticle(params.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() article: Article) {
    return this.service.saveArticle(article);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param() params, @Body() article: Article) {
    return this.service.updateArticle(params.id, article);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteArticle(@Param() params) {
    this.service.deleteArticle(params.id);
    return;
  }
}
