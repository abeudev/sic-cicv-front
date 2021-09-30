const list = {
  listUsage: () => import('./usage'),
  listAvatarTitleAndAction: () => import('./avatarTitleAndAction'),
  listIconTwoLinesAndAction: () => import('./iconTwoLinesAndAction'),
  listAvatarThreeLines: () => import('./avatarThreeLines'),
  listAvatarSubheaderTitleAndAction: () => import('./avatarSubheaderTitleAndAction'),
  listSubheadingsAndDividers: () => import('./subheadingsAndDividers'),
  listCardList: () => import('./cardList'),
  listTitleSubtitleActionsAndActionText: () => import('./titleSubtitleActionsAndActionText'),
  listActionTitleAndSubtitle: () => import('./actionTitleAndSubtitle'),
  listExpansionLists: () => import('./expansionLists'),
}

export default list;