// This is an auto-generated file. Do not edit.
// Run 'BALLERINA_HOME="your/ballerina/home" npm run gen-models' to generate.
// tslint:disable:ban-types
export interface STNode {
  kind: string;
  value?: any;
  parent?: STNode;
}

export interface AbstractKeyword extends STNode {
  isToken: boolean;
  value: string;
}

export interface ActionStatement extends STNode {
  expression: RemoteMethodCallAction;
  semicolonToken: SemicolonToken;
}

export interface Annotation extends STNode {
  annotReference: QualifiedNameReference | SimpleNameReference;
  annotValue: MappingConstructor;
  atToken: AtToken;
}

export interface AnyKeyword extends STNode {
  isToken: boolean;
  value: string;
}

export interface AnyTypeDesc extends STNode {
  name: AnyKeyword;
}

export interface AnydataKeyword extends STNode {
  isToken: boolean;
  value: string;
}

export interface AnydataTypeDesc extends STNode {
  name: AnydataKeyword;
}

export interface AssignmentStatement extends STNode {
  equalsToken: EqualToken;
  expression:
    | BinaryExpression
    | CheckExpression
    | DecimalFloatingPointLiteral
    | DecimalIntegerLiteral
    | FieldAccess
    | FunctionCall
    | IndexedExpression
    | QualifiedNameReference
    | RemoteMethodCallAction
    | SimpleNameReference
    | StringLiteral
    | TypeCastExpression;
  semicolonToken: SemicolonToken;
  varRef:
    | FieldAccess
    | IndexedExpression
    | QualifiedNameReference
    | SimpleNameReference;
}

export interface AsteriskToken extends STNode {
  isToken: boolean;
  value: string;
}

export interface AtToken extends STNode {
  isToken: boolean;
  value: string;
}

export interface BacktickToken extends STNode {
  isToken: boolean;
  value: string;
}

export interface BinaryExpression extends STNode {
  lhsExpr:
    | BinaryExpression
    | DecimalIntegerLiteral
    | FieldAccess
    | FunctionCall
    | MethodCall
    | NilLiteral
    | SimpleNameReference
    | StringLiteral;
  operator:
    | AsteriskToken
    | BitwiseAndToken
    | BitwiseXorToken
    | DoubleEqualToken
    | GtEqualToken
    | GtToken
    | LtEqualToken
    | LtToken
    | NotDoubleEqualToken
    | PipeToken
    | PlusToken;
  rhsExpr:
    | BinaryExpression
    | CheckExpression
    | DecimalFloatingPointLiteral
    | DecimalIntegerLiteral
    | FieldAccess
    | FunctionCall
    | MethodCall
    | SimpleNameReference
    | StringLiteral;
}

export interface BitwiseAndToken extends STNode {
  isToken: boolean;
  value: string;
}

export interface BitwiseXorToken extends STNode {
  isToken: boolean;
  value: string;
}

export interface BlockStatement extends STNode {
  closeBraceToken: CloseBraceToken;
  openBraceToken: OpenBraceToken;
  statements: Array<
    | ActionStatement
    | AssignmentStatement
    | BlockStatement
    | CallStatement
    | CompoundAssignmentStatement
    | ContinueStatement
    | IfElseStatement
    | Invalid
    | LocalVarDecl
    | ReturnStatement
  >;
}

export interface BooleanKeyword extends STNode {
  isToken: boolean;
  value: string;
}

export interface BooleanTypeDesc extends STNode {
  name: BooleanKeyword;
}

export interface BracedExpression extends STNode {
  closeParen: CloseParenToken;
  expression:
    | BinaryExpression
    | FunctionCall
    | IndexedExpression
    | MethodCall
    | SimpleNameReference
    | StringLiteral
    | TrueKeyword
    | TypeTestExpression;
  openParen: OpenParenToken;
}

export interface ByteKeyword extends STNode {
  isToken: boolean;
  value: string;
}

export interface ByteTypeDesc extends STNode {
  name: ByteKeyword;
}

export interface CallStatement extends STNode {
  expression: CheckExpression | FunctionCall | MethodCall;
  semicolonToken: SemicolonToken;
}

export interface CheckExpression extends STNode {
  checkKeyword: CheckKeyword | CheckpanicKeyword;
  expression:
    | BracedExpression
    | FunctionCall
    | MethodCall
    | RawTemplateExpression;
}

export interface CheckKeyword extends STNode {
  isToken: boolean;
  value: string;
}

export interface CheckpanicKeyword extends STNode {
  isToken: boolean;
  value: string;
}

export interface CloseBracePipeToken extends STNode {
  isToken: boolean;
  value: string;
}

export interface CloseBraceToken extends STNode {
  isToken: boolean;
  value: string;
}

export interface CloseBracketToken extends STNode {
  isToken: boolean;
  value: string;
}

export interface CloseParenToken extends STNode {
  isToken: boolean;
  value: string;
}

export interface ColonToken extends STNode {
  isToken: boolean;
  value: string;
}

export interface CommaToken extends STNode {
  isToken: boolean;
  value: string;
}

export interface CompoundAssignmentStatement extends STNode {
  binaryOperator:
    | AsteriskToken
    | BitwiseAndToken
    | BitwiseXorToken
    | MinusToken
    | PipeToken
    | PlusToken
    | SlashToken;
  equalsToken: EqualToken;
  lhsExpression: SimpleNameReference;
  rhsExpression: DecimalIntegerLiteral;
  semicolonToken: SemicolonToken;
}

export interface ComputedNameField extends STNode {
  closeBracket: CloseBracketToken;
  colonToken: ColonToken;
  fieldNameExpr: BracedExpression;
  openBracket: OpenBracketToken;
  valueExpr: FunctionCall;
}

export interface ConstDeclaration extends STNode {
  constKeyword: ConstKeyword;
  equalsToken: EqualToken;
  initializer:
    | DecimalIntegerLiteral
    | ListConstructor
    | MappingConstructor
    | StringLiteral;
  metadata: Metadata;
  semicolonToken: SemicolonToken;
  typeDescriptor?: IntTypeDesc | ParameterizedTypeDesc | StringTypeDesc;
  variableName: IdentifierToken | SimpleNameReference;
}

export interface ConstKeyword extends STNode {
  isToken: boolean;
  value: string;
}

export interface ContinueKeyword extends STNode {
  isToken: boolean;
  value: string;
}

export interface ContinueStatement extends STNode {
  continueToken: ContinueKeyword;
  semicolonToken: SemicolonToken;
}

export interface DecimalFloatingPointLiteral extends STNode {
  isToken?: boolean;
  literalToken?: DecimalFloatingPointLiteral;
  value?: string;
}

export interface DecimalIntegerLiteral extends STNode {
  isToken?: boolean;
  literalToken?: DecimalIntegerLiteral;
  value?: string;
}

export interface DocumentationLine extends STNode {
  isToken: boolean;
  value: string;
}

export interface DocumentationString extends STNode {
  documentationLines: DocumentationLine[];
}

export interface DotToken extends STNode {
  isToken: boolean;
  value: string;
}

export interface DoubleEqualToken extends STNode {
  isToken: boolean;
  value: string;
}

export interface EllipsisToken extends STNode {
  isToken: boolean;
  value: string;
}

export interface ElseBlock extends STNode {
  elseBody: BlockStatement | IfElseStatement;
  elseKeyword: ElseKeyword;
}

export interface ElseKeyword extends STNode {
  isToken: boolean;
  value: string;
}

export interface EofToken extends STNode {
  isToken: boolean;
  value: string;
}

export interface EqualToken extends STNode {
  isToken: boolean;
  value: string;
}

export interface ErrorKeyword extends STNode {
  isToken: boolean;
  value: string;
}

export interface ErrorTypeDesc extends STNode {
  errorKeywordToken: ErrorKeyword;
}

export interface ExpressionListItem extends STNode {
  expression: FunctionCall | SimpleNameReference;
  leadingComma?: CommaToken;
}

export interface ExternalFunctionBody extends STNode {
  annotations: Annotation[];
  equalsToken: EqualToken;
  externalKeyword: ExternalKeyword;
  semicolonToken: SemicolonToken;
}

export interface ExternalKeyword extends STNode {
  isToken: boolean;
  value: string;
}

export interface FalseKeyword extends STNode {
  isToken?: boolean;
  literalToken?: FalseKeyword;
  value?: string;
}

export interface FieldAccess extends STNode {
  dotToken: DotToken;
  expression:
    | DecimalFloatingPointLiteral
    | FieldAccess
    | MethodCall
    | SimpleNameReference;
  fieldName: IdentifierToken;
}

export interface FloatKeyword extends STNode {
  isToken: boolean;
  value: string;
}

export interface FloatTypeDesc extends STNode {
  name: FloatKeyword;
}

export interface ForeachKeyword extends STNode {
  isToken: boolean;
  value: string;
}

export interface ForeachStatement extends STNode {
  ActionOrExpressionNode: BinaryExpression | SimpleNameReference;
  blockStatement: BlockStatement;
  forEachKeyword: ForeachKeyword;
  inKeyword: InKeyword;
  typeDescriptor: AnyTypeDesc | UnionTypeDesc | VarTypeDesc;
  variableName: IdentifierToken;
}

export interface FunctionBodyBlock extends STNode {
  closeBraceToken: CloseBraceToken;
  namedWorkerDeclarator?: NamedWorkerDeclarator;
  openBraceToken: OpenBraceToken;
  statements: Array<
    | AssignmentStatement
    | BlockStatement
    | CallStatement
    | CompoundAssignmentStatement
    | ForeachStatement
    | IfElseStatement
    | Invalid
    | LocalVarDecl
    | LockStatement
    | ReturnStatement
    | WhileStatement
  >;
}

export interface FunctionCall extends STNode {
  arguments: Array<NamedArg | PositionalArg>;
  closeParenToken: CloseParenToken;
  functionName:
    | DecimalIntegerLiteral
    | QualifiedNameReference
    | SimpleNameReference;
  openParenToken: OpenParenToken;
}

export interface FunctionDefinition extends STNode {
  closeParenToken: CloseParenToken;
  functionBody: ExternalFunctionBody | FunctionBodyBlock;
  functionKeyword: FunctionKeyword;
  functionName: IdentifierToken;
  metadata: Metadata;
  openParenToken: OpenParenToken;
  parameters: Array<RequiredParam | RestParam>;
  returnTypeDesc?: ReturnTypeDescriptor;
  visibilityQualifier?: PublicKeyword | ResourceKeyword;
}

export interface FunctionKeyword extends STNode {
  isToken: boolean;
  value: string;
}

export interface FutureKeyword extends STNode {
  isToken: boolean;
  value: string;
}

export interface GtEqualToken extends STNode {
  isToken: boolean;
  value: string;
}

export interface GtToken extends STNode {
  isToken: boolean;
  value: string;
}

export interface HandleKeyword extends STNode {
  isToken: boolean;
  value: string;
}

export interface HandleTypeDesc extends STNode {
  name: HandleKeyword;
}

export interface IdentifierToken extends STNode {
  isToken: boolean;
  value: string;
}

export interface IfElseStatement extends STNode {
  condition: BinaryExpression | BracedExpression | TypeTestExpression;
  elseBody?: ElseBlock;
  ifBody: BlockStatement;
  ifKeyword: IfKeyword;
}

export interface IfKeyword extends STNode {
  isToken: boolean;
  value: string;
}

export interface ImportDeclaration extends STNode {
  importKeyword: ImportKeyword;
  moduleName: Array<DotToken | IdentifierToken>;
  orgName?: ImportOrgName;
  semicolon: SemicolonToken;
}

export interface ImportKeyword extends STNode {
  isToken: boolean;
  value: string;
}

export interface ImportOrgName extends STNode {
  orgName: IdentifierToken;
  slashToken: SlashToken;
}

export interface InKeyword extends STNode {
  isToken: boolean;
  value: string;
}

export interface IndexedExpression extends STNode {
  closeBracket: CloseBracketToken;
  containerExpression:
    | AnyTypeDesc
    | AnydataTypeDesc
    | ByteTypeDesc
    | IndexedExpression
    | IntTypeDesc
    | MethodCall
    | NilTypeDesc
    | SimpleNameReference
    | StringTypeDesc;
  keyExpression?:
    | AsteriskToken
    | DecimalIntegerLiteral
    | SimpleNameReference
    | StringLiteral;
  openBracket: OpenBracketToken;
}

export interface IntKeyword extends STNode {
  isToken: boolean;
  value: string;
}

export interface IntTypeDesc extends STNode {
  name: IntKeyword;
}

export interface Invalid extends STNode {
  expression: BinaryExpression | QualifiedNameReference;
  semicolonToken: SemicolonToken;
}

export interface IsKeyword extends STNode {
  isToken: boolean;
  value: string;
}

export interface ListConstructor extends STNode {
  closeBracket: CloseBracketToken;
  expressions: Array<
    | CommaToken
    | DecimalIntegerLiteral
    | ListConstructor
    | SimpleNameReference
    | StringLiteral
  >;
  openBracket: OpenBracketToken;
}

export interface ListenerDeclaration extends STNode {
  equalsToken: EqualToken;
  initializer: FunctionCall;
  listenerKeyword: ListenerKeyword;
  metadata: Metadata;
  semicolonToken: SemicolonToken;
  typeDescriptor: QualifiedNameReference;
  variableName: IdentifierToken;
}

export interface ListenerKeyword extends STNode {
  isToken: boolean;
  value: string;
}

export interface LocalVarDecl extends STNode {
  annotations: any;
  equalsToken?: EqualToken;
  initializer?:
    | BinaryExpression
    | CheckExpression
    | DecimalIntegerLiteral
    | FunctionCall
    | ListConstructor
    | MappingConstructor
    | MethodCall
    | RemoteMethodCallAction
    | SimpleNameReference
    | StringLiteral
    | TrapExpression
    | TypeCastExpression
    | TypeTestExpression
    | XmlTemplateExpression;
  semicolonToken: SemicolonToken;
  typeName:
    | AnyTypeDesc
    | AnydataTypeDesc
    | ByteTypeDesc
    | FloatTypeDesc
    | IndexedExpression
    | IntTypeDesc
    | NilTypeDesc
    | ObjectTypeDesc
    | OptionalTypeDesc
    | ParameterizedTypeDesc
    | QualifiedNameReference
    | RecordTypeDesc
    | SimpleNameReference
    | StringTypeDesc
    | UnionTypeDesc
    | VarTypeDesc
    | XmlTypeDesc;
  variableName: IdentifierToken;
}

export interface LockKeyword extends STNode {
  isToken: boolean;
  value: string;
}

export interface LockStatement extends STNode {
  blockStatement: BlockStatement;
  lockKeyword: LockKeyword;
}

export interface LtEqualToken extends STNode {
  isToken: boolean;
  value: string;
}

export interface LtToken extends STNode {
  isToken: boolean;
  value: string;
}

export interface MapKeyword extends STNode {
  isToken: boolean;
  value: string;
}

export interface MappingConstructor extends STNode {
  closeBrace: CloseBraceToken;
  fields: Array<ComputedNameField | SpecificField | SpreadField>;
  openBrace: OpenBraceToken;
}

export interface Metadata extends STNode {
  annotations: Annotation[];
  documentationString?: DocumentationString;
}

export interface MethodCall extends STNode {
  arguments: PositionalArg[];
  closeParenToken: CloseParenToken;
  dotToken: DotToken;
  expression: IndexedExpression | MethodCall | SimpleNameReference;
  methodName: IdentifierToken;
  openParenToken: OpenParenToken;
}

export interface MinusToken extends STNode {
  isToken: boolean;
  value: string;
}

export interface ModuleVarDecl extends STNode {
  equalsToken?: EqualToken;
  initializer?:
    | DecimalIntegerLiteral
    | FalseKeyword
    | FunctionCall
    | ListConstructor
    | MappingConstructor
    | SimpleNameReference;
  metadata: Metadata;
  semicolonToken: SemicolonToken;
  typeName:
    | BooleanTypeDesc
    | IndexedExpression
    | IntTypeDesc
    | NilTypeDesc
    | QualifiedNameReference
    | UnionTypeDesc;
  variableName: IdentifierToken;
}

export interface NamedArg extends STNode {
  argumentName: SimpleNameReference;
  equalsToken: EqualToken;
  expression:
    | IndexedExpression
    | MappingConstructor
    | SimpleNameReference
    | StringLiteral;
  leadingComma?: CommaToken;
}

export interface NamedWorkerDeclaration extends STNode {
  annotations: any;
  returnTypeDesc?: ReturnTypeDescriptor;
  workerBody: BlockStatement;
  workerKeyword: WorkerKeyword;
  workerName: IdentifierToken;
}

export interface NamedWorkerDeclarator extends STNode {
  namedWorkerDeclarations: NamedWorkerDeclaration[];
  workerInitStatements: any;
}

export interface NilLiteral extends STNode {
  closeParenToken: CloseParenToken;
  openParenToken: OpenParenToken;
}

export interface NilTypeDesc extends STNode {
  closeParenToken: CloseParenToken;
  openParenToken: OpenParenToken;
}

export interface NotDoubleEqualToken extends STNode {
  isToken: boolean;
  value: string;
}

export interface ObjectField extends STNode {
  fieldName: IdentifierToken;
  metadata: Metadata;
  semicolonToken: SemicolonToken;
  typeName:
    | IntTypeDesc
    | RecordTypeDesc
    | SimpleNameReference
    | StringTypeDesc
    | TypeDesc;
  visibilityQualifier?: PublicKeyword;
}

export interface ObjectKeyword extends STNode {
  isToken: boolean;
  value: string;
}

export interface ObjectTypeDesc extends STNode {
  closeBrace: CloseBraceToken;
  members: Array<FunctionDefinition | ObjectField>;
  objectKeyword: ObjectKeyword;
  objectTypeQualifiers: AbstractKeyword[];
  openBrace: OpenBraceToken;
}

export interface OnKeyword extends STNode {
  isToken: boolean;
  value: string;
}

export interface OpenBracePipeToken extends STNode {
  isToken: boolean;
  value: string;
}

export interface OpenBraceToken extends STNode {
  isToken: boolean;
  value: string;
}

export interface OpenBracketToken extends STNode {
  isToken: boolean;
  value: string;
}

export interface OpenParenToken extends STNode {
  isToken: boolean;
  value: string;
}

export interface OptionalTypeDesc extends STNode {
  questionMarkToken: QuestionMarkToken;
  typeDescriptor: ErrorTypeDesc;
}

export interface ParameterizedTypeDesc extends STNode {
  gtToken: GtToken;
  ltToken: LtToken;
  parameterizedType: FutureKeyword | MapKeyword;
  typeNode:
    | IntTypeDesc
    | NilTypeDesc
    | ParameterizedTypeDesc
    | StringTypeDesc
    | UnionTypeDesc;
}

export interface PipeToken extends STNode {
  isToken: boolean;
  value: string;
}

export interface PlusToken extends STNode {
  isToken: boolean;
  value: string;
}

export interface PositionalArg extends STNode {
  expression:
    | BinaryExpression
    | DecimalIntegerLiteral
    | FieldAccess
    | FunctionCall
    | IndexedExpression
    | MethodCall
    | QualifiedNameReference
    | SimpleNameReference
    | StringLiteral
    | TrueKeyword
    | TypeCastExpression
    | TypeTestExpression
    | XmlTemplateExpression;
  leadingComma?: CommaToken;
}

export interface PublicKeyword extends STNode {
  isToken: boolean;
  value: string;
}

export interface QualifiedNameReference extends STNode {
  colon: ColonToken;
  identifier: IdentifierToken;
  modulePrefix: IdentifierToken;
}

export interface QuestionMarkToken extends STNode {
  isToken: boolean;
  value: string;
}

export interface RawTemplateExpression extends STNode {
  content: TemplateString[];
  endBacktick: BacktickToken;
  startBacktick: BacktickToken;
}

export interface RecordField extends STNode {
  fieldName: IdentifierToken;
  metadata: Metadata;
  semicolonToken: SemicolonToken;
  typeName:
    | BooleanTypeDesc
    | FloatTypeDesc
    | IntTypeDesc
    | ObjectTypeDesc
    | RecordTypeDesc
    | SimpleNameReference
    | StringTypeDesc;
}

export interface RecordKeyword extends STNode {
  isToken: boolean;
  value: string;
}

export interface RecordTypeDesc extends STNode {
  bodyEndDelimiter: CloseBracePipeToken | CloseBraceToken;
  bodyStartDelimiter: OpenBracePipeToken | OpenBraceToken;
  fields: RecordField[];
  objectKeyword: RecordKeyword;
}

export interface RemoteMethodCallAction extends STNode {
  arguments: PositionalArg[];
  closeParenToken: CloseParenToken;
  expression: SimpleNameReference;
  methodName: IdentifierToken;
  openParenToken: OpenParenToken;
  rightArrowToken: RightArrowToken;
}

export interface RequiredParam extends STNode {
  annotations: any;
  leadingComma?: CommaToken;
  paramName: IdentifierToken;
  typeName:
    | IntTypeDesc
    | ParameterizedTypeDesc
    | QualifiedNameReference
    | RecordTypeDesc
    | SimpleNameReference
    | StringTypeDesc;
}

export interface ResourceKeyword extends STNode {
  isToken: boolean;
  value: string;
}

export interface RestParam extends STNode {
  annotations: any;
  ellipsisToken: EllipsisToken;
  paramName: IdentifierToken;
  typeName: AnyTypeDesc | UnionTypeDesc;
}

export interface ReturnKeyword extends STNode {
  isToken: boolean;
  value: string;
}

export interface ReturnStatement extends STNode {
  expression?:
    | BinaryExpression
    | BracedExpression
    | FalseKeyword
    | FieldAccess
    | SimpleNameReference
    | TrueKeyword;
  returnKeyword: ReturnKeyword;
  semicolonToken: SemicolonToken;
}

export interface ReturnTypeDescriptor extends STNode {
  annotations: Annotation[];
  returnsKeyword: ReturnsKeyword;
  type:
    | AnyTypeDesc
    | AnydataTypeDesc
    | BooleanTypeDesc
    | FloatTypeDesc
    | HandleTypeDesc
    | IndexedExpression
    | IntTypeDesc
    | OptionalTypeDesc
    | StringTypeDesc
    | TypeDesc
    | UnionTypeDesc;
}

export interface ReturnsKeyword extends STNode {
  isToken: boolean;
  value: string;
}

export interface RightArrowToken extends STNode {
  isToken: boolean;
  value: string;
}

export interface SemicolonToken extends STNode {
  isToken: boolean;
  value: string;
}

export interface ServiceBody extends STNode {
  closeBraceToken: CloseBraceToken;
  openBraceToken: OpenBraceToken;
  resources: FunctionDefinition[];
}

export interface ServiceDeclaration extends STNode {
  expressions: ExpressionListItem[];
  metadata: Metadata;
  onKeyword: OnKeyword;
  serviceBody: ServiceBody;
  serviceKeyword: ServiceKeyword;
  serviceName: IdentifierToken;
}

export interface ServiceKeyword extends STNode {
  isToken: boolean;
  value: string;
}

export interface SimpleNameReference extends STNode {
  name: IdentifierToken;
}

export interface SlashToken extends STNode {
  isToken: boolean;
  value: string;
}

export interface SpecificField extends STNode {
  colon: ColonToken;
  fieldName: IdentifierToken | StringLiteral;
  leadingComma?: CommaToken;
  valueExpr:
    | BinaryExpression
    | CheckExpression
    | DecimalFloatingPointLiteral
    | DecimalIntegerLiteral
    | FalseKeyword
    | FunctionCall
    | ListConstructor
    | MappingConstructor
    | SimpleNameReference
    | StringLiteral
    | TrueKeyword;
}

export interface SpreadField extends STNode {
  ellipsis: EllipsisToken;
  valueExpr: BracedExpression;
}

export interface StringKeyword extends STNode {
  isToken: boolean;
  value: string;
}

export interface StringLiteral extends STNode {
  isToken?: boolean;
  literalToken?: StringLiteral;
  value?: string;
}

export interface StringTypeDesc extends STNode {
  name: StringKeyword;
}

export interface SyntaxTree extends STNode {
  eofToken: EofToken;
  imports: ImportDeclaration[];
  members: Array<
    | ConstDeclaration
    | EofToken
    | FunctionDefinition
    | ImportDeclaration
    | ListenerDeclaration
    | ModuleVarDecl
    | ServiceDeclaration
    | TypeDefinition
  >;
}

export interface TemplateString extends STNode {
  isToken: boolean;
  value: string;
}

export interface TrapExpression extends STNode {
  expression: FunctionCall;
  trapKeyword: TrapKeyword;
}

export interface TrapKeyword extends STNode {
  isToken: boolean;
  value: string;
}

export interface TrueKeyword extends STNode {
  isToken?: boolean;
  literalToken?: TrueKeyword;
  value?: string;
}

export interface TypeCastExpression extends STNode {
  expression:
    | BracedExpression
    | CheckExpression
    | IndexedExpression
    | RemoteMethodCallAction
    | SimpleNameReference
    | UnaryExpression;
  gtToken: GtToken;
  ltToken: LtToken;
  typeCastParam: TypeCastParam;
}

export interface TypeCastParam extends STNode {
  annotations?: Annotation[];
  type:
    | ByteTypeDesc
    | IntTypeDesc
    | SimpleNameReference
    | StringTypeDesc
    | TypeDesc;
}

export interface TypeDefinition extends STNode {
  metadata: Metadata;
  semicolonToken: SemicolonToken;
  typeDescriptor: ObjectTypeDesc | RecordTypeDesc | UnionTypeDesc;
  typeKeyword: TypeKeyword;
  typeName: IdentifierToken;
  visibilityQualifier?: PublicKeyword;
}

export interface TypeDesc extends STNode {
  isToken: boolean;
  value: string;
}

export interface TypeKeyword extends STNode {
  isToken: boolean;
  value: string;
}

export interface TypeTestExpression extends STNode {
  expression: FieldAccess | SimpleNameReference;
  isKeyword: IsKeyword;
  typeDescriptor:
    | ErrorTypeDesc
    | IntTypeDesc
    | ParameterizedTypeDesc
    | QualifiedNameReference
    | SimpleNameReference
    | StringTypeDesc;
}

export interface UnaryExpression extends STNode {
  expression: SimpleNameReference;
  unaryOperator: MinusToken;
}

export interface UnionTypeDesc extends STNode {
  leftTypeDesc:
    | AnyTypeDesc
    | IntTypeDesc
    | QualifiedNameReference
    | SimpleNameReference;
  pipeToken: PipeToken;
  rightTypeDesc: ErrorTypeDesc | SimpleNameReference | StringTypeDesc;
}

export interface VarKeyword extends STNode {
  isToken: boolean;
  value: string;
}

export interface VarTypeDesc extends STNode {
  name: VarKeyword;
}

export interface WhileKeyword extends STNode {
  isToken: boolean;
  value: string;
}

export interface WhileStatement extends STNode {
  condition: BracedExpression;
  whileBody: BlockStatement;
  whileKeyword: WhileKeyword;
}

export interface WorkerKeyword extends STNode {
  isToken: boolean;
  value: string;
}

export interface XmlElement extends STNode {
  content: XmlText[];
  endTag: XmlElementEndTag;
  startTag: XmlElementStartTag;
}

export interface XmlElementEndTag extends STNode {
  getToken: GtToken;
  ltToken: LtToken;
  name: SimpleNameReference;
  slashToken: SlashToken;
}

export interface XmlElementStartTag extends STNode {
  attributes: any;
  getToken: GtToken;
  ltToken: LtToken;
  name: SimpleNameReference;
}

export interface XmlKeyword extends STNode {
  isToken: boolean;
  value: string;
}

export interface XmlTemplateExpression extends STNode {
  content: Array<
    | AtToken
    | CloseBraceToken
    | CloseBracketToken
    | CloseParenToken
    | ColonToken
    | CommaToken
    | DecimalIntegerLiteral
    | DotToken
    | EqualToken
    | FunctionKeyword
    | GtToken
    | IdentifierToken
    | IntKeyword
    | LtToken
    | OpenBraceToken
    | OpenBracketToken
    | OpenParenToken
    | PlusToken
    | SemicolonToken
    | StringKeyword
    | StringLiteral
    | XmlElement
  >;
  endBacktick: BacktickToken;
  startBacktick: BacktickToken;
  type: XmlKeyword;
}

export interface XmlText extends STNode {
  content: XmlTextContent;
}

export interface XmlTextContent extends STNode {
  isToken: boolean;
  value: string;
}

export interface XmlTypeDesc extends STNode {
  name: XmlKeyword;
}

// tslint:enable:ban-types
