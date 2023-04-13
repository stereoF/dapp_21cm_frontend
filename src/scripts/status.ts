enum ProcessStatus { Pending, ReviewerAssigned, EditorRejected, ReviewerRejected, AppendReviewer, NeedRevise, RepliedNew, Published }
enum ReviewerStatus { NotSubmit, Revise, Reject, Pass }
  
export function useStatus() {
    return { ProcessStatus, ReviewerStatus }
}