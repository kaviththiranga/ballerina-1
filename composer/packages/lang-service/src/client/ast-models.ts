export interface BallerinaAST {
    id: string;
    kind: string;
    topLevelNodes: BallerinaASTNode[];
}
export interface BallerinaASTNode {
    kind: string;
}
export interface BallerinaEndpoint {
    orgName: string;
    packageName: string;
    name: string;
}
export interface BallerinaSourceFragment {
    source: string;
    expectedNodeType: string;
    enclosingScope?: string;
}
